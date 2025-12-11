import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';

export const StyledDatePickerWrapper = styled.div`
  .react-datepicker {
    border: none;
    border-radius: 12px;
    padding: 16px 20px;
    box-shadow:
      -4px -4px 4px 0 rgba(0, 0, 0, 0.05),
      4px 4px 4px 0 rgba(0, 0, 0, 0.04);
  }

  .react-datepicker__header {
    border: none;
    background-color: ${color.white};
    padding: 8px 0;
  }

  .react-datepicker__current-month {
    ${font.p2}
    font-weight: 700;
    color: ${color.black};
    margin-bottom: 4px;
  }

  .react-datepicker__navigation {
    top: 20px;
    margin: 0 14px;
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${color.primary};
    border-width: 2.5px 2.5px 0 0;
    border-radius: 2px;
  }

  .react-datepicker__day-names {
    display: flex;
    justify-content: space-around;
  }

  .react-datepicker__day-name {
    ${font.p4}
    color: ${color.gray500};
    width: 28px;
    line-height: 28px;
    margin: 0;
  }

  .react-datepicker__month {
    margin: 8px;
  }

  .react-datepicker__week {
    display: flex;
    justify-content: space-around;
  }

  .react-datepicker__day {
    ${font.p4}
    width: 28px;
    height: 28px;
    line-height: 28px;
    margin: 0;
    color: ${color.black};
    border-radius: 10px;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${color.gray100};
      border-radius: 20px;
    }
  }

  .react-datepicker__day--disabled {
    color: ${color.gray300};
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
    }
  }

  .react-datepicker__day--outside-month {
    color: ${color.gray300};
  }

  .react-datepicker__day--in-range {
    font-weight: 700;
    background-color: ${color.lightblue} !important;
    color: ${color.black} !important;
    border-radius: 0 !important;
  }

  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    position: relative;
    background-color: transparent !important;
    font-weight: 700;
    color: ${color.white} !important;
  }

  .react-datepicker__day--range-start:not(
      .react-datepicker__day--range-end
    )::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: ${color.lightblue};
    z-index: 0;
  }

  .react-datepicker__day--range-end:not(
      .react-datepicker__day--range-start
    )::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: ${color.lightblue};
    z-index: 0;
  }

  .react-datepicker__day--range-start::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${color.primary};
    border-radius: 50%;
    z-index: 1;
  }

  .react-datepicker__day--range-end::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${color.primary};
    border-radius: 50%;
    z-index: 1;
  }

  .day-text {
    position: relative;
    z-index: 2;
  }

  .react-datepicker__day--range-start.react-datepicker__day--range-end {
    &::after {
      background-color: ${color.primary};
      border-radius: 50%;
      width: 100%;
      left: 0;
      right: auto;
    }

    &::before {
      display: none;
    }
  }

  .react-datepicker__day--in-selecting-range {
    background-color: ${color.lightblue} !important;
    color: ${color.black} !important;
    border-radius: 0 !important;
  }

  .react-datepicker__day--in-selecting-range:has(.selecting-start) {
    border-top-left-radius: 20px !important;
    border-bottom-left-radius: 20px !important;
  }

  .react-datepicker__day--in-selecting-range:hover {
    border-top-right-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
    color: ${color.black};
  }

  .react-datepicker__day--selected {
    background-color: ${color.primary} !important;
    color: ${color.white} !important;
    border-radius: 20px !important;
    font-weight: 700;
  }

  .react-datepicker__day:focus {
    outline: none;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__day--today {
    font-weight: 700;
    color: ${color.primary};
  }
`;
