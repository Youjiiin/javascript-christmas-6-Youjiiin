import InputView from "./InputView";
import OutputView from "./OutputView";
import Validate from "./Validate";
import { MENU } from "./constants/Menu";

class App {
  date;
  order;
  totalPrice = 0;
  
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
    } else {
      //이벤트 적용안됨
      this.printOrder();
    }
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
}

export default App;
