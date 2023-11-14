import DiscountEvent from "./DiscountEvent";
import InputView from "./InputView";
import OutputView from "./OutputView";
import Validate from "./Validate";
import { Badge } from "./constants/Badge";
import { MENU } from "./constants/Menu";

class App {
  date;
  order;
  categoryTotals = {
    APPETIZER: 0,
    MAIN: 0,
    DESSERT: 0,
    DRINK: 0
  };
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
    await this.getDate();
    await this.getOrder();
    this.printOrder();

    this.calculateTotalPrice();
    this.applyDiscount();
    this.sumDiscount();
    this.formatChangeToPrint();
  }

  //날짜 받기
  async getDate() {
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
  }


  //주문 받기
  async getOrder() {
    let isValid = false;
    while (!isValid) {
      try {
        const inputOrder = await InputView.readOrder();
        const convertOrder = this.convertObject(inputOrder);
        for (let key in convertOrder) {
          convertOrder[key] = parseInt(convertOrder[key]);
        }
        this.order = Validate.validateOrder(convertOrder);
        isValid = true;
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }

  //입력받은 주문 객체로 변경
  convertObject(inputOrder) {
    const items = inputOrder.split(',');
    const result = {};
    items.forEach(element => {
      const [key, value] = element.split('-');
      result[key] = value;
    });
    return result;
  }

  //주문한 메뉴 출력
  printOrder() {
    let userOrder = Object.entries(this.order).map(([item, quantity]) => `${item} ${quantity}개`).join('\n');
    OutputView.printMenu(userOrder);
  }

  //총 금액 계산
  calculateTotalPrice() {
    for (const [item, quantity] of Object.entries(this.order)) {
      const { categoryName, price } = this.findPriceInMenu(item, MENU);
      if (categoryName) {
        this.categoryTotals[categoryName] += price * quantity;
      }
    }
    this.totalPrice = Object.values(this.categoryTotals).reduce((total, amount) => total + amount, 0);
  }

  //메뉴에 해당하는 가격 검색
  findPriceInMenu(item, menu) {
    for (const [categoryName, categoryItems] of Object.entries(menu)) {
      if (item in categoryItems) {
          return { categoryName, price: categoryItems[item] };
      }
    }
    return { categoryName: null, price: 0 };
  }

  //할인적용
  applyDiscount() {
    this.dDayDiscount = DiscountEvent.christmasDdayDiscount(this.date);
    this.specialDiscount = DiscountEvent.specialDayDiscount(this.date);
    this.weekdayDiscount = DiscountEvent.weekDayDiscount(this.date, this.order);
    this.weekendDiscount = DiscountEvent.weekendDiscount(this.date, this.order);
    this.giftEvent = DiscountEvent.giftEventDiscount(this.totalPrice);
    this.sumDiscount();
  }

  //혜택내역 정리
  discountList() {
    let event = [];
    if (this.dDayDiscount > 0) {
      const dDay = this.dDayDiscount.toLocaleString();
      event.push(`크리스마스 디데이 할인: -${dDay}원`);
    }
    if (this.weekdayDiscount > 0) {
      const week = this.weekdayDiscount.toLocaleString();
      event.push(`평일 할인: -${week}원`)
    }
    if (this.weekendDiscount > 0) {
      const weekend = this.weekendDiscount.toLocaleString();
      event.push(`주말 할인: -${weekend}원`)
    }
    if (this.specialDiscount > 0) {
      const special = this.specialDiscount.toLocaleString();
      event.push(`특별 할인: -${special}원`)
    }
    if (this.giftEvent > 0) {
      const gift = this.giftEvent.toLocaleString();
      event.push(`증정 이벤트: -${gift}원`)
    }
    if (event.length === 0) {
      event.push("없음");
    }

    return event;
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

  //결과 출력
  formatChangeToPrint() {
    //할인 전 총주문 금액
    let changeTotalPrice = this.totalPrice.toLocaleString();
    OutputView.printTotalPrice(changeTotalPrice);

    //증정 메뉴
    if (this.giftEvent === 25000) {
      OutputView.printGiftEvent("샴페인 1개");
    } else {
      OutputView.printGiftEvent("없음");
    }

    //혜택 내역
    let discountarray = this.discountList();
    OutputView.printDiscount(discountarray);

    //총혜택 금액
    const discountPrice = this.totalDiscount.toLocaleString();
    OutputView.printTotalDiscount(discountPrice);

    //할인 후 예상 결제 금액
    if (this.giftEvent) {
      let pay = (this.totalPrice - this.totalDiscount + this.giftEvent).toLocaleString();
      OutputView.printPayment(pay);
    } else {
      let pay = (this.totalPrice - this.totalDiscount).toLocaleString();
      OutputView.printPayment(pay);
    }

    //12월 이벤트 배지
    OutputView.printBadge(this.badge);
  }
}

export default App;
