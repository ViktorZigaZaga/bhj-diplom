/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = this.element.querySelector(".accounts-select");
    if(User.current()) {
      Account.list(User.current(), (err, response) => {
        if(response && response.success) {
          response.data.forEach(item => {
            select.innerHTML += `<option value="${item.id}">${item.name}</option>`;
          });
        } else {
          alert(err);
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    const typeForm = this.element.closest(".modal").dataset.modalId;
    Transaction.create(data,(err, response) => {
      if(response && response.success) {
        App.getModal(`${typeForm}`).close();
        this.element.reset();
        App.update();
      } else {
        alert(err);
      }
    });
  }
}