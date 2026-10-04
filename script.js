// =======================================================
// AccountDukan — site scripts
// =======================================================

(function () {
    "use strict";

    var WHATSAPP_NUMBER = "923217995041";

    /* ---------------------------------------------------
       AI Assistant chat widget
       --------------------------------------------------- */

    var knowledgeBase = [
        {
            keywords: ["instagram"],
            reply: "Instagram accounts are $35 / 100, aged with a high trust score, phone verified and ready for growth."
        },
        {
            keywords: ["threads"],
            reply: "Threads accounts are $40 / 100 — phone verified, available for USA / JP / TW / RU and marketing ready."
        },
        {
            keywords: ["gmail"],
            reply: "Gmail accounts are $30 / 100, with verified numbers, instant login and bulk quantities available."
        },
        {
            keywords: ["onepl"],
            reply: "OnePL accounts are $45 / 100 — phone verified with a high trust profile and fast activation."
        },
        {
            keywords: ["facebook"],
            reply: "Facebook accounts are $35 / 100, phone verified with a high trust profile and multiple geo options."
        },
        {
            keywords: ["package", "price", "pricing", "cost", "rate"],
            reply: "Our packages: Instagram $35/100, Threads $40/100, Gmail $30/100, OnePL $45/100, Facebook $35/100. Which platform are you interested in?"
        },
        {
            keywords: ["deliver", "delivery", "fast", "instant"],
            reply: "Delivery is instant for most orders — accounts are handed over right after payment is confirmed."
        },
        {
            keywords: ["replace", "replacement", "guarantee", "warranty"],
            reply: "Every order comes with a replacement guarantee — if an account has an issue, let us know and we'll replace it."
        },
        {
            keywords: ["secure", "safe", "private", "privacy"],
            reply: "All accounts are handled securely and privately — we don't share your order details with anyone."
        },
        {
            keywords: ["geo", "country", "location", "region"],
            reply: "We offer multiple geo / IP options depending on the platform — tell us which platform and target country you need."
        },
        {
            keywords: ["pay", "payment", "paypal", "card", "bank"],
            reply: "For payment options, please chat with our support team on WhatsApp — they'll guide you through the available methods."
        },
        {
            keywords: ["support", "help", "human", "agent", "contact"],
            reply: "Sure — you can reach our support team directly on WhatsApp or by email from the contact section on this page."
        },
        {
            keywords: ["hi", "hello", "hey", "salam", "assalam"],
            reply: "Hey there! I'm the AccountDukan assistant. Ask me about our packages, pricing, delivery time or replacement policy."
        },
        {
            keywords: ["thank", "thanks", "shukriya"],
            reply: "You're welcome! Let me know if there's anything else you'd like to know."
        }
    ];

    var fallbackReply =
        "I don't have an exact answer for that yet — for anything specific about your order, our support team on WhatsApp or email can help right away.";

    function findReply(message) {
        var text = message.toLowerCase();
        for (var i = 0; i < knowledgeBase.length; i++) {
            var entry = knowledgeBase[i];
            for (var j = 0; j < entry.keywords.length; j++) {
                if (text.indexOf(entry.keywords[j]) !== -1) {
                    return entry.reply;
                }
            }
        }
        return fallbackReply;
    }

    var chatbotEl, messagesEl, formEl, inputEl, quickRepliesEl;
    var chatbotStarted = false;

    function addMessage(text, sender) {
        var bubble = document.createElement("div");
        bubble.className = "ai-msg " + sender;
        bubble.textContent = text;
        messagesEl.appendChild(bubble);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function handleUserMessage(text) {
        if (!text.trim()) {
            return;
        }
        addMessage(text, "user");
        window.setTimeout(function () {
            addMessage(findReply(text), "bot");
        }, 350);
    }

    function initChatbotOnce() {
        if (chatbotStarted) {
            return;
        }
        chatbotStarted = true;
        addMessage(
            "Hi! I'm the AccountDukan assistant. Ask me about packages, pricing, delivery or replacements.",
            "bot"
        );
    }

    window.openChatbot = function () {
        if (!chatbotEl) {
            return;
        }
        chatbotEl.classList.add("open");
        chatbotEl.setAttribute("aria-hidden", "false");
        initChatbotOnce();
        if (inputEl) {
            inputEl.focus();
        }
    };

    window.closeChatbot = function () {
        if (!chatbotEl) {
            return;
        }
        chatbotEl.classList.remove("open");
        chatbotEl.setAttribute("aria-hidden", "true");
    };

    function initChatbot() {
        chatbotEl = document.getElementById("aiChatbot");
        messagesEl = document.getElementById("aiChatbotMessages");
        formEl = document.getElementById("aiChatbotForm");
        inputEl = document.getElementById("aiChatbotInput");
        quickRepliesEl = document.getElementById("aiChatbotQuickReplies");

        if (!chatbotEl || !formEl) {
            return;
        }

        formEl.addEventListener("submit", function (event) {
            event.preventDefault();
            var text = inputEl.value;
            inputEl.value = "";
            handleUserMessage(text);
        });

        if (quickRepliesEl) {
            quickRepliesEl.addEventListener("click", function (event) {
                var button = event.target.closest("button");
                if (button) {
                    handleUserMessage(button.textContent.trim());
                }
            });
        }

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                window.closeChatbot();
            }
        });
    }

    /* ---------------------------------------------------
       Buy Now buttons -> WhatsApp order message
       --------------------------------------------------- */

    function initBuyButtons() {
        var cards = document.querySelectorAll(".package-card");
        cards.forEach(function (card) {
            var button = card.querySelector(".btn");
            var titleEl = card.querySelector("h3");
            var priceEl = card.querySelector(".price");
            if (!button || !titleEl || !priceEl) {
                return;
            }
            var name = titleEl.textContent.replace(/\s+/g, " ").trim();
            var price = priceEl.textContent.replace(/\s+/g, " ").trim();

            button.addEventListener("click", function () {
                var message = "Hi, I want to order " + name + " (" + price + ").";
                var url =
                    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
                window.open(url, "_blank");
            });
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        initChatbot();
        initBuyButtons();
    });
})();
