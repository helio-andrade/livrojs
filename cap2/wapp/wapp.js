function copyToClipboard(text) {
  try {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    tempInput.classList.add("campo_temporario");
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    const btCopiar = document.getElementById("bt_copiar");
    btCopiar.style.display = "none";
    btCopiar.innerHTML = "COPIADO!";
    btCopiar.style.display = "inline";
  } catch (e) {}
}

const isMobile = {
  Android: () => /Android/i.test(navigator.userAgent),
  BlackBerry: () => /BlackBerry/i.test(navigator.userAgent),
  iOS: () => /iPhone|iPad|iPod/i.test(navigator.userAgent),
  Opera: () => /Opera Mini/i.test(navigator.userAgent),
  Windows: () => /IEMobile/i.test(navigator.userAgent),
  any: () => Object.values(isMobile).some((fn) => fn()),
};

function openWhats() {
  const link = document.getElementById("abrir_link").getAttribute("href");
  const link_final = isMobile.any()
    ? `whatsapp://send?&phone=+${link}`
    : `https://web.whatsapp.com/send?phone=${link}`;
  location.href = link_final;
}

document.addEventListener("DOMContentLoaded", () => {
  let l = "";

  const fNumero = document.getElementById("f_numero");
  fNumero.addEventListener("focusout", () => {
    const input = fNumero;
    input.unmask();
    if (input.value.replace(/\D/g, "").length > 10) {
      input.mask("(99) 99999-999?9");
    } else {
      input.mask("(99) 9999-9999?9");
    }
  });
  fNumero.dispatchEvent(new Event("focusout"));

  const fWhats = document.getElementById("f_whats");
  fWhats.addEventListener("submit", (event) => {
    event.preventDefault();

    const fNumeroValue = document.getElementById("f_numero").value;
    if (fNumeroValue === "") {
      window.alert("Preencha com o número do WhatsApp!");
      document.getElementById("f_numero").focus();
      return false;
    }

    const btSubmit = document.getElementById("bt_submit");
    btSubmit.disabled = true;
    btSubmit.value = "Aguarde";
    btSubmit.classList.add("bt-desabilitado");

    setTimeout(() => {
      const fPaisValue = document.getElementById("f_pais").value;
      const fNumeroValue = document.getElementById("f_numero").value;
      const fMensagemValue = document.getElementById("f_mensagem").value || "";
      const numero = fNumeroValue.replace(/[\(\)\-\s]/g, "");

      const link = fMensagemValue !== ""
        ? `https://wa.me/${fPaisValue}${numero}/?t=${encodeURIComponent(fMensagemValue)}`
        : `https://wa.me/${fPaisValue}${numero}`;
      l = link;

      document.getElementById("f_link").value = link;
      document.getElementById("bt_copiar").href = link;
      btSubmit.style.display = "none";
      document.getElementById("link-gerado").style.display = "block";

      // $.post(root_url + "/set_hit.php", {
      //   acao: "cadastrou WhatsApp",
      //   url: link,
      //   r: root_ref
      // }, function(response) {});

    }, 1000);
    return false;
  });

  document.getElementById("bt_copiar").addEventListener("click", () => {
    // $.post(root_url + "/set_hit.php", {
    //   acao: "copiou link gerado",
    //   url: l,
    //   r: root_ref
    // }, function(response) {});

    copyToClipboard(document.getElementById("bt_copiar").href);
    return false;
  });

  window.document.addEventListener("copy", () => {
    if (!document.getElementsByClassName("campo_temporario").length) {
      // $.post(root_url + "/set_hit.php", {
      //   acao: "selecionou e copiou",
      //   complemento: window.getSelection().toString(),
      //   url: window.location.href,
      //   r: root_ref
      // }, function(response) {});
    }
  });
});