function addButton() {
    const button = document.createElement("button");
    button.innerText = "My Custom Button Test1";
    button.addEventListener("click", () => {
        // Действия, которые будут выполняться при клике на кнопку
        console.log('yes it is');
    });

    const container = document.querySelector(".b-content-filter"); // Замените на нужный селектор
    container.appendChild(button);
}

// Вызываем функцию добавления кнопки при загрузке страницы
window.addEventListener("load", addButton);


document.addEventListener("DOMContentLoaded", () => {
    const myButton = document.getElementById("myButton");
    myButton.addEventListener("click", () => {
        // Действия, которые будут выполняться при клике на кнопку
        console.log("yes it is");
    });
});