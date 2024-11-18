
// CARRINHO 
const cart = [];

// Função para abrir o popup
function enviarPedido(dessertName) {
    const hasFlavor = dessertName === "Trufas";
    showPopup(dessertName, hasFlavor);
}

// Função para adicionar o item selecionado ao carrinho
function addToCart() {
    const dessert = document.getElementById("popup-title").textContent.replace("Pedido de ", "");
    const quantity = parseInt(document.getElementById("quantity").value, 10);
    const flavor = document.getElementById("flavor").value;
    const pricePerUnit = dessert === "Trufas" ? 5.00 : 3.00; // Exemplo de preços por unidade
    const totalItemPrice = pricePerUnit * quantity;

    cart.push({
        name: dessert,
        quantity: quantity,
        price: pricePerUnit,
        flavor: dessert === "Trufas" ? flavor : null,
        totalItemPrice: totalItemPrice
    });

    updateCart(); // Atualiza a exibição do carrinho
    closePopup(); // Fecha o popup após adicionar ao carrinho
}

// Função para atualizar a lista do carrinho na interface
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    cartItems.innerHTML = ""; // Limpa a lista de itens
    let total = 0;

    // Cria cada item do carrinho na lista
    cart.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} (${item.flavor || ''}) - Qtd: ${item.quantity} - R$${item.price.toFixed(2)} cada`;
        cartItems.appendChild(listItem);
        total += item.totalItemPrice;
    });

    totalPriceElement.textContent = `Total: R$${total.toFixed(2)}`;
}

// Alternar visibilidade do carrinho e do overlay
function toggleCart() {
    const cartElement = document.getElementById("cart");
    const overlayElement = document.getElementById("overlay");

    // Verifica o estado do carrinho e do overlay
    if (cartElement.style.display === "none" || cartElement.style.display === "") {
        cartElement.style.display = "block";
        overlayElement.style.display = "block";
    } else {
        cartElement.style.display = "none";
        overlayElement.style.display = "none";
    }
}



// Função para fechar o popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Enviar o pedido para WhatsApp
function sendOrder() {
    const message = cart.map(item => 
        `Doce: ${item.name}, Sabor: ${item.flavor || 'N/A'}, Quantidade: ${item.quantity}, Preço: R$${item.price.toFixed(2)}`
    ).join('\n');
    const phoneNumber = "558597502373";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    toggleCart(); // Fecha o carrinho
}
