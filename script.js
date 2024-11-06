function enviarPedido(dessertName) {
    const hasFlavor = dessertName === "Trufas";  // Só Trufas tem sabor
    showPopup(dessertName, hasFlavor);
}

function showPopup(dessertName, hasFlavor = false) {
    // Atualiza o título do popup
    document.getElementById("popup-title").textContent = `Pedido de ${dessertName}`;
    
    // Exibe ou oculta a seção de sabor dependendo do item
    document.getElementById("flavor-section").style.display = hasFlavor ? "block" : "none";
    
    // Exibe o popup
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    // Esconde o popup quando fechar
    document.getElementById("popup").style.display = "none";
}

function sendToWhatsApp() {
    // Obtém o nome do doce, a quantidade e o sabor (se houver)
    const dessert = document.getElementById("popup-title").textContent.replace("Pedido de ", "");
    const quantity = document.getElementById("quantity").value;
    const flavor = document.getElementById("flavor").value;
    const flavorText = dessert === "Trufas" ? `Sabor: ${flavor}` : "";
    
    // Cria a mensagem a ser enviada pelo WhatsApp
    const message = `Olá, eu desejo:\n${dessert}\nQuantidade: ${quantity}\n${flavorText}`;
    
    // Número de telefone do WhatsApp
    const phoneNumber = "558597502373";
    
    // Cria a URL para enviar a mensagem
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Abre o WhatsApp com a mensagem predefinida
    window.open(url, "_blank");
    
    // Fecha o popup após o envio
    closePopup();
}
