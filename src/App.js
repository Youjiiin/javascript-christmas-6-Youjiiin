import DiscountEvent from "./DiscountEvent";
import InputView from "./InputView";
import OutputView from "./OutputView";
import Validate from "./Validate";
import { Badge } from "./constants/Badge";
import { MENU } from "./constants/Menu";

class App {
  date;
  order;
  totalPrice = 0;

  dDayDiscount = 0;
  specialDiscount = 0;
  weekdayDiscount = 0;
  weekendDiscount = 0;
  giftEvent = 0;
  totalDiscount = 0;
  badge = "";
  
  //시작
  async run() {
    OutputView.hello();
    let isValid = false;
    while (!isValid) {
      try {
        const inputDate = await InputView.readDate();
        this.date = Validate.validateDate(inputDate);
        isValid = true;
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
    this.getOrder();
  }

  //주문 받기
  async getOrder() {
    let isValid = false;
    while (!isValid) {
      try {
        const inputOrder = await InputView.readOrder();
        const convertOrder = this.convertObject(inputOrder);
        this.order = Validate.validateOrder(convertOrder);
        isValid = true;
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
    this.checkEventTarget();
  }

  //입력받은 주문 객체로 변경
  convertObject(inputOrder) {
    const items = inputOrder.split(',');
    const result = {};
    items.forEach(element => {
      const [key, value] = element.split('-');
      result[key] = parseInt(value);
    });
    return result;
  }

  //이벤트 대상인지 확인
  checkEventTarget() {
    this.totalPrice = this.calculateTotalPrice();
    if (this.totalPrice >= 10000) {
      //이벤트 적용됨
      this.printOrder();
      this.applyDiscount();
    } else {
      //이벤트 적용안됨
      this.printOrder();
    }
  }

  //할인적용
  applyDiscount() {
    this.dDayDiscount = DiscountEvent.christmasDdayDiscount(this.date);
    this.specialDiscount = DiscountEvent.specialDayDiscount(this.date);
    this.weekdayDiscount = DiscountEvent.WeekDayDiscount(this.date);
    this.weekendDiscount = DiscountEvent.WeekendDiscount(this.date);
    this.giftEvent = DiscountEvent.giftEventDiscount(this.totalPrice);
    this.sumDiscount();
  }

  //총 금액 계산
  calculateTotalPrice() {
    let calculatePrice = 0;
    for (const [item, quantity] of Object.entries(this.order)) {
      const price = this.findPriceInMenu(item, MENU);
      calculatePrice += price * quantity;
    }
    return calculatePrice;
  }

  //메뉴에 해당하는 가격 검색
  findPriceInMenu(item, menu) {
    for (const category of Object.values(menu)) {
      if (item in category) {
        return category[item];
      }
    }
    return 0;
  }

  //주문한 메뉴 출력
  printOrder() {
    let userOrder = Object.entries(this.order).map(([item, quantity]) => `${item} ${quantity}개`).join('\n');
    OutputView.printMenu(userOrder);
  }

  //총 할인금액 계산 및 뱃지 확인
  sumDiscount() {
    this.totalDiscount = this.dDayDiscount + this.specialDiscount + this.weekdayDiscount + this.weekendDiscount + this.giftEvent;
    this.badge = this.awardBadge();
  }

  //뱃지부여
  awardBadge() {
    if (this.totalDiscount > 20000) {
      return Badge[3];
    }
    if (this.totalDiscount > 10000) {
      return Badge[2];
    }
    if (this.totalDiscount > 5000) {
      return Badge[1];
    }
    return Badge[0];
  }
}

export default App;
