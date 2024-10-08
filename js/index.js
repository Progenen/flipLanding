if (document.querySelector(".slider")) {
    new Glide('.slider', {
        type: "carousel",
        gap: 0
    }).mount()

}

if (document.querySelector(".modal")) {
    const modals = document.querySelectorAll(".modal");
    const modalForm = document.querySelector(".modal-form");
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    const modalFormClose = modalForm.querySelector("[data-modal-close]");
    const modalAllClose = document.querySelectorAll('[data-all-modal-close]');
    const modalSucess = document.querySelector(".modal-alert--sucess");
    const modalFailed = document.querySelector(".modal-alert--failed");

    modalAllClose.forEach(item => {
        item.addEventListener("click", () => {
            modals.forEach(el => {
                el.classList.remove("show");
            })
        })
    })

    modalTriggers.forEach(item => {
        item.addEventListener("click", () => {
            modalForm.classList.add("show");
        })
    });

    modalFormClose.addEventListener("click", () => {
        modalForm.classList.remove("show");
    });


    const forms = document.querySelectorAll("form");
    const ajaxSend = async (formData) => {
        const response = await fetch("./mail.php", {
            method: "POST",
            body: formData
        });
        if (response.ok) {
            modalForm.classList.remove("show");
            modalSucess.classList.add("show");
        } else {
            modalForm.classList.remove("show");
            modalFailed.classList.add("show");

        }
        return await response.text();
    };
    
    forms.forEach(form => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(this);

            ajaxSend(formData)
                .then((response) => {
                    form.reset();
                })
                .catch((err) => console.error(err))
        });
    });

    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___)-___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5)  this.value = ""
        }
    
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)
    
      });
}