import InputView from "./InputView";
import OutputView from "./OutputView";
import Validate from "./Validate";

class App {
  date;
  order;
  
  //시작
  async run() {
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
}

export default App;
