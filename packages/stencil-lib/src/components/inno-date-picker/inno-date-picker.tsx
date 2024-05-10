import { Component, Host, h, Element, Prop, State, Watch, Event, EventEmitter, Method, Fragment } from '@stencil/core';
import { DateTime, Info } from 'luxon';
import { OnListener } from '../../utils/listener';
import { computePosition } from '@floating-ui/dom';
import { DateChange } from '../inno-date-api/inno-date-api';

interface CalendarWeek {
  weekNumber: number;
  dayNumbers: number[];
}

/**
 * Date picker.
 */
@Component({
  tag: 'inno-date-picker',
  styleUrl: 'inno-date-picker.scss',
  scoped: true,
})
export class InnoDatePicker {
  @Element() hostElement: HTMLElement & InnoDatePicker;

  /**
   * Date format string.
   *
   */
  @Prop() format: string = 'yyyy/LL/dd';
  // See {@link "https://moment.github.io/luxon/#/formatting?id=table-of-tokens"} for all available tokens.

  /**
   * If true a date-range can be selected (from/to).
   */
  @Prop() range: boolean = true;

  /**
   * The selected starting date. If the date-pickeris not in range mode this is the selected date.
   * Format has to match the `format` property.
   */
  @Prop() from: string | undefined;

  @Watch('from')
  watchFromPropHandler(newValue: string) {
    this.currFromDate = newValue ? DateTime.fromFormat(newValue, this.format) : undefined;

    if (this.currFromDate?.isValid) {
      this.selectedYear = this.currFromDate.year;
      this.selectedMonth = this.currFromDate.month - 1;
    }
  }

  /**
   * The selected end date. If the date-picker is not in range mode this property has no impact.
   * Format has to match the `format` property.
   */
  @Prop() to: string | undefined;

  @Watch('to')
  watchToPropHandler(newValue: string) {
    this.currToDate = newValue ? DateTime.fromFormat(newValue, this.format) : undefined;

    if (this.currToDate?.isValid) {
      this.selectedYear = this.currToDate.year;
      this.selectedMonth = this.currToDate.month - 1;
    }
  }

  /**
   * The earliest date that can be selected by the date picker.
   * If not set there will be no restriction.
   */
  @Prop() minDate: string;

  /**
   * The latest date that can be selected by the date picker.
   * If not set there will be no restriction.
   */
  @Prop() maxDate: string;

  /**
   * Text of date select button
   */
  @Prop({ attribute: 'i18n-done' }) i18nDone = 'Done';

  /**
   * The index of which day to start the week on, based on the Locale#weekdays array.
   * E.g. if the locale is en-us, weekStartIndex = 1 results in starting the week on monday.
   */
  @Prop() weekStartIndex = 0;

  /**
   * Format of time string
   *
   */
  @Prop() locale: string = undefined;
  // See {@link "https://moment.github.io/luxon/#/formatting?id=table-of-tokens"} for all available tokens.

  @Watch('locale')
  onLocaleChange() {
    this.setTranslations();
  }

  /** @internal */
  @Prop() standaloneAppearance = true;

  /** @internal */
  @Prop() today = DateTime.now().toISO();

  /**
   * Triggers if the date selection changes.
   */
  @Event() dateChange: EventEmitter<DateChange>;

  /**
   * Triggers if the date selection changes.
   * Only triggered if date-picker is in range mode.
   */
  @Event() dateRangeChange: EventEmitter<DateChange>;

  /**
   * Date selection confirmed via button action
   */
  @Event() dateSelect: EventEmitter<DateChange>;

  /**
   * Get the currently selected date-range.
   */
  @Method()
  async getCurrentDate() {
    const _from = this.currFromDate?.isValid ? this.currFromDate?.toFormat(this.format) : undefined;
    const _to = this.currToDate?.isValid ? this.currToDate?.toFormat(this.format) : undefined;

    if (this.range) {
      return {
        from: _from,
        to: _to,
      };
    }

    return {
      from: _from,
      to: undefined,
    };
  }

  @State() currFromDate: DateTime;
  @State() currToDate: DateTime;

  @State() selectedYear: number;
  @State() tempYear: number;
  @State() startYear: number;
  @State() endYear: number;
  @State() selectedMonth: number;
  @State() tempMonth: number;

  @State() dropdownButtonRef: HTMLElement;
  @State() dropdownContainerRef: HTMLElement;
  @State() showDropdown = false;
  @State() yearContainerRef: HTMLElement;

  @State() dayNames: string[];
  @State() monthNames: string[];
  @State() firstMonthRef: HTMLElement;
  @State() focusedDay: number = 1;
  @State() focusedDayElem: HTMLElement;

  private isDayFocus: boolean;
  private monthChangedFromFocus: boolean;
  private readonly DAYS_IN_WEEK = 7;
  private calendar: CalendarWeek[];

  @OnListener<InnoDatePicker>('keydown')
  handleKeyUp(event: KeyboardEvent) {
    if (!this.isDayFocus) {
      return;
    }

    let _focusedDay = this.focusedDay;

    switch (event.key) {
      case 'ArrowLeft':
        _focusedDay--;
        break;
      case 'ArrowRight':
        _focusedDay++;
        break;
      case 'ArrowUp':
        _focusedDay = _focusedDay - 7;
        break;
      case 'ArrowDown':
        _focusedDay = _focusedDay + 7;
        break;
      default:
        return;
    }

    if (_focusedDay > this.getDaysInCurrentMonth()) {
      _focusedDay = _focusedDay - this.getDaysInCurrentMonth();
      this.changeToAdjacentMonth(1);
      this.monthChangedFromFocus = true;
    } else if (_focusedDay < 1) {
      this.changeToAdjacentMonth(-1);
      _focusedDay = _focusedDay + this.getDaysInCurrentMonth();
      this.monthChangedFromFocus = true;
    }

    this.focusedDay = _focusedDay;
  }

  private getDaysInCurrentMonth(): number {
    return DateTime.utc(this.selectedYear, this.selectedMonth + 1).daysInMonth;
  }

  private getDateTimeNow() {
    return DateTime.fromISO(this.today);
  }

  onDayBlur() {
    this.isDayFocus = false;
  }

  onDayFocus() {
    this.isDayFocus = true;
  }

  componentWillLoad() {
    this.setTranslations();

    this.currFromDate = this.from ? DateTime.fromFormat(this.from, this.format) : undefined;
    this.currToDate = this.to ? DateTime.fromFormat(this.to, this.format) : undefined;

    const year = this.currFromDate?.year ?? this.getDateTimeNow().year;
    this.startYear = year - 5;
    this.endYear = year + 5;

    this.selectedMonth = (this.currFromDate?.month ?? this.getDateTimeNow().month) - 1;
    this.selectedYear = year;
    this.tempMonth = this.selectedMonth;
    this.tempYear = this.selectedYear;
  }

  componentWillRender() {
    this.calculateCalendar();
  }

  componentDidRender() {
    if (!this.monthChangedFromFocus && !this.isDayFocus) {
      return;
    }

    const dayElem = this.hostElement.querySelector(`[id=day-cell-${this.focusedDay}]`) as HTMLElement;
    dayElem.focus();
  }

  private setTranslations() {
    this.dayNames = this.rotateWeekDayNames(
      Info.weekdays('long', {
        locale: this.locale,
      }),
      this.weekStartIndex,
    );

    this.monthNames = Info.months('long', {
      locale: this.locale,
    });
  }

  /**
   * Rotate the WeekdayNames array.
   * Based on the position that should be the new 0-index.
   */
  private rotateWeekDayNames(weekdays: string[], index: number): string[] {
    const clone = [...weekdays];

    if (index === 0) {
      return clone;
    }

    index = -index;
    const len = weekdays.length;

    clone.push(...clone.splice(0, ((-index % len) + len) % len));
    return clone;
  }

  // private async onDone() {
  //   const date = await this.getCurrentDate();
  //   this.dateSelect.emit(date);
  // }

  private calculateCalendar() {
    const calendar: CalendarWeek[] = [];
    const month = DateTime.utc(this.selectedYear, this.selectedMonth + 1);
    const monthStart = month.startOf('month');
    const monthEnd = month.endOf('month');
    let startWeek = monthStart.weekNumber;
    let endWeek = monthEnd.weekNumber;
    let monthStartWeekDayIndex = monthStart.weekday - 1;
    let monthEndWeekDayIndex = monthEnd.weekday - 1;

    if (this.weekStartIndex !== 0) {
      // Find the positions where to start/stop counting the day-numbers based on which day the week starts
      const weekdays = Info.weekdays();
      const monthStartWeekDayName = weekdays[monthStart.weekday];

      monthStartWeekDayIndex = this.dayNames.findIndex(d => d === monthStartWeekDayName);
      const monthEndWeekDayName = weekdays[monthEnd.weekday];
      monthEndWeekDayIndex = this.dayNames.findIndex(d => d === monthEndWeekDayName);
    }

    let correctLastWeek = false;
    if (endWeek === 1) {
      endWeek = monthEnd.weeksInWeekYear + 1;
      correctLastWeek = true;
    }

    let correctFirstWeek = false;
    if (startWeek === monthStart.weeksInWeekYear) {
      startWeek = 1;
      endWeek++;

      correctFirstWeek = true;
    }

    let currDayNumber = 1;
    for (let weekIndex = startWeek; weekIndex <= endWeek && currDayNumber <= 31; weekIndex++) {
      const daysArr: number[] = [];

      for (let j = 0; j < this.DAYS_IN_WEEK && currDayNumber <= 31; j++) {
        // Display empty cells until the calender starts/has ended
        if ((weekIndex === startWeek && j < monthStartWeekDayIndex) || (weekIndex === endWeek && j > monthEndWeekDayIndex)) {
          daysArr.push(undefined);
        } else {
          daysArr.push(currDayNumber++);
        }
      }

      if (correctFirstWeek || correctLastWeek) {
        if (weekIndex === 1) {
          calendar.push({
            weekNumber: monthStart.weeksInWeekYear,
            dayNumbers: daysArr,
          });
        } else if (weekIndex === monthEnd.weekNumber) {
          calendar.push({
            weekNumber: 1,
            dayNumbers: daysArr,
          });
        } else {
          calendar.push({
            weekNumber: weekIndex - 1,
            dayNumbers: daysArr,
          });
        }
        continue;
      }

      calendar.push({
        weekNumber: weekIndex,
        dayNumbers: daysArr,
      });
    }

    this.calendar = calendar;
  }

  private selectTempYear(event: MouseEvent, year: number) {
    event?.stopPropagation();
    this.tempYear = year;
  }

  private focusMonth() {
    this.firstMonthRef.focus();
  }

  private infiniteScrollYears() {
    const scroll = this.yearContainerRef.scrollTop;
    const maxScroll = this.yearContainerRef.scrollHeight;
    const atTop = scroll === 0;
    const atBottom = Math.round(scroll + this.yearContainerRef.offsetHeight) >= maxScroll;
    const limit = 200;

    if (this.endYear - this.startYear > limit) return;

    if (atTop) {
      const first = this.yearContainerRef.firstElementChild as HTMLElement;
      this.startYear -= 5;
      this.yearContainerRef.scrollTo(0, first.offsetTop);

      return;
    }

    if (atBottom) {
      const last = this.yearContainerRef.lastElementChild as HTMLElement;
      this.endYear += 5;
      this.yearContainerRef.scrollTo(0, last.offsetTop);
    }
  }

  private selectMonth(month: number) {
    this.selectedMonth = month;
    this.selectedYear = this.tempYear;
    this.tempMonth = month;

    // Schedule the operation to make it recognizeable for stencil state change handling
    setTimeout(() => (this.showDropdown = false));
  }

  private changeToAdjacentMonth(number: -1 | 1) {
    // Previous year
    if (this.selectedMonth + number < 0) {
      this.selectedYear--;
      this.selectedMonth = 11;
      return;
    }

    // Next year
    if (this.selectedMonth + number > 11) {
      this.selectedYear++;
      this.selectedMonth = 0;
      return;
    }

    this.selectedMonth += number;
  }

  private selectDay(selectedDay: number) {
    const date = DateTime.fromJSDate(new Date(this.selectedYear, this.selectedMonth, selectedDay));

    if (!this.range || this.currFromDate === undefined) {
      this.currFromDate = date;
      this.onDateChange();
      return;
    }

    // Reset the range selection
    if (this.currToDate !== undefined) {
      this.currFromDate = date;
      this.currToDate = undefined;
      this.onDateChange();
      return;
    }

    // Swap from/to if the second date is before the current date
    if (date < this.currFromDate) {
      this.currToDate = this.currFromDate;
      this.currFromDate = date;
      this.onDateChange();
      return;
    }

    // Set the range normally
    this.currToDate = date;
    this.onDateChange();
  }

  private onDateChange() {
    this.getCurrentDate().then(date => {
      this.dateChange.emit(date);
      if (this.range) {
        this.dateRangeChange.emit(date);
      }
    });
  }

  private getDayClasses(day: number): any {
    if (!day) {
      return;
    }

    const todayObj = this.getDateTimeNow();
    const selectedDayObj = DateTime.fromJSDate(new Date(this.selectedYear, this.selectedMonth, day));

    return {
      'calendar-item': true,
      'empty-day': day === undefined,
      'today': todayObj.hasSame(selectedDayObj, 'day'),
      'selected': this.currFromDate?.hasSame(selectedDayObj, 'day') || this.currToDate?.hasSame(selectedDayObj, 'day'),
      'range':
        selectedDayObj.startOf('day') > this.currFromDate?.startOf('day') && this.currToDate !== undefined && selectedDayObj.startOf('day') < this.currToDate?.startOf('day'),
      'disabled': !this.isWithinMinMaxDate(selectedDayObj),
    };
  }

  private isWithinMinMaxYear(year: number): boolean {
    const minDateYear = this.minDate ? DateTime.fromFormat(this.minDate, this.format).year : undefined;
    const maxDateYear = this.maxDate ? DateTime.fromFormat(this.maxDate, this.format).year : undefined;
    const isBefore = minDateYear ? year < minDateYear : false;
    const isAfter = maxDateYear ? year > maxDateYear : false;

    return !isBefore && !isAfter;
  }

  private isWithinMinMaxMonth(month: number): boolean {
    const minDateObj = this.minDate ? DateTime.fromFormat(this.minDate, this.format) : undefined;
    const maxDateObj = this.maxDate ? DateTime.fromFormat(this.maxDate, this.format) : undefined;
    const minDateMonth = minDateObj?.month;
    const maxDateMonth = maxDateObj?.month;
    const isBefore = minDateMonth ? this.tempYear === minDateObj.year && month < minDateMonth : false;
    const isAfter = maxDateMonth ? this.tempYear === maxDateObj.year && month > maxDateMonth : false;

    return !isBefore && !isAfter;
  }

  private isWithinMinMaxDate(date: DateTime): boolean {
    const _minDate = this.minDate ? DateTime.fromFormat(this.minDate, this.format) : undefined;
    const _maxDate = this.maxDate ? DateTime.fromFormat(this.maxDate, this.format) : undefined;
    const isBefore = _minDate ? date.startOf('day') < _minDate.startOf('day') : false;
    const isAfter = _maxDate ? date.startOf('day') > _maxDate.startOf('day') : false;

    return !isBefore && !isAfter;
  }

  private async openDropdownSelector() {
    const result = await computePosition(this.dropdownButtonRef, this.dropdownContainerRef, { placement: 'bottom-start', strategy: 'absolute' });
    this.dropdownContainerRef.style.top = `${result.y}`;
    this.dropdownContainerRef.style.left = `${result.x}`;
    this.showDropdown = !this.showDropdown;
  }

  private dropDown() {
    console.log(`Dropdown: ${this.showDropdown}`);

    const classes = {
      dropdown: true,
      show: this.showDropdown,
    };
    return (
      <div class={classes} ref={ref => (this.dropdownContainerRef = ref)}>
        <div class="wrapper">
          {this.renderYears()}
          {this.dropdownMonths()}
        </div>
      </div>
    );
  }

  private renderYears(): any[] {
    const rows = [];

    for (let year = this.startYear; year <= this.endYear; year++) {
      const yearClasses = {
        'arrowYear': true,
        'month-dropdown-item': true,
        'disabled-item': !this.isWithinMinMaxYear(year),
      };

      const iconClasses = {
        hidden: this.tempYear !== year,
        arrowPosition: true,
      };

      rows.push(
        <div
          key={year}
          class={yearClasses}
          onClick={event => this.selectTempYear(event, year)}
          onKeyUp={event => {
            if (event.key === 'Enter') {
              this.selectTempYear(null, year);
              this.focusMonth();
            }
          }}
          tabIndex={0}
        >
          <inno-icon class={iconClasses} icon="chevronrightsmall" size={16}></inno-icon>
          <div style={{ 'min-width': 'max-content' }}>{`${year}`}</div>
        </div>,
      );
    }

    return (
      <div class="overflow" ref={ref => (this.yearContainerRef = ref)} onScroll={() => this.infiniteScrollYears()}>
        {rows}
      </div>
    );
  }

  private dropdownMonths() {
    const months = this.monthNames.map((month, index) => {
      const classes = {
        'arrowYear': true,
        'month-dropdown-item': true,
        'selected': this.tempYear === this.selectedYear && this.tempMonth === index,
        'disabled-item': !this.isWithinMinMaxMonth(index),
      };

      const iconClasses = {
        hidden: this.tempYear !== this.selectedYear || this.tempMonth !== index,
        checkPosition: true,
      };

      return (
        <div
          key={month}
          ref={ref => {
            if (month === this.monthNames[0]) {
              this.firstMonthRef = ref as HTMLElement;
            }
          }}
          class={classes}
          onClick={() => this.selectMonth(index)}
          onKeyUp={event => event.key === 'Enter' && this.selectMonth(index)}
          tabIndex={0}
        >
          <inno-icon class={iconClasses} icon="chevronrightsmall" size={16}></inno-icon>
          <div>
            <span>{`${month} ${this.tempYear}`}</span>
          </div>
        </div>
      );
    });

    return <div class="overflow">{months}</div>;
  }

  private header() {
    return (
      <div class="header" slot="header">
        <inno-icon icon="chevronleftsmall" size={24} class="navigation" onClick={() => this.changeToAdjacentMonth(-1)}></inno-icon>
        <div class="selector">
          <span ref={ref => (this.dropdownButtonRef = ref)} onClick={() => this.openDropdownSelector()}>
            {this.monthNames[this.selectedMonth]} {this.selectedYear}
            {this.dropDown()}
          </span>
        </div>
        <inno-icon icon="chevronrightsmall" size={24} class="navigation" onClick={() => this.changeToAdjacentMonth(1)}></inno-icon>
      </div>
    );
  }

  private calendarGrid() {
    return (
      <div class="grid">
        <div class="calendar-item week-day"></div>
        {this.createCalendarWeekNamesLayout()}
        {this.createCalendarDaysLayout()}
      </div>
    );
  }

  createCalendarWeekNamesLayout() {
    return this.dayNames.map(name => (
      <div key={name} class="calendar-item week-day">
        {name.slice(0, 3)}
      </div>
    ));
  }

  createCalendarDaysLayout() {
    return this.calendar.map(week => {
      return (
        <Fragment>
          <div class="calendar-item week-number">{week.weekNumber}</div>
          {week.dayNumbers.map(day => {
            return (
              <div
                key={day}
                id={`day-cell-${day}`}
                date-calender-day
                class={this.getDayClasses(day)}
                onClick={() => this.selectDay(day)}
                onKeyUp={e => e.key === 'Enter' && this.selectDay(day)}
                tabIndex={day === this.focusedDay ? 0 : -1}
                onFocus={() => this.onDayFocus()}
                onBlur={() => this.onDayBlur()}
              >
                {day}
              </div>
            );
          })}
        </Fragment>
      );
    });
  }

  // private footerPart() {
  //   const classes = {
  //     button: true,
  //     hidden: !this.range || !this.standaloneAppearance,
  //   };

  //   return (
  //     <div class={classes}>
  //       <inno-button onClick={() => this.onDone()}>{this.i18nDone}</inno-button>
  //     </div>
  //   );
  // }

  render() {
    return (
      <Host>
        <inno-date-time-card standaloneAppearance={this.standaloneAppearance}>
          {this.header()}
          {this.calendarGrid()}
        </inno-date-time-card>
      </Host>
    );
  }
}
