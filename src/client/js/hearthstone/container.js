export default class Container {
  constructor() {
    this.container = {};
  }

  add (card) {
    // 站场 > 效果
    // 放入容器
    this.container.push(card);
    // 卡牌效果
    let action = card.getAction();
    this.handleAction(action);
  }

  handleAction(action) {
    console.log(action);
  }
}