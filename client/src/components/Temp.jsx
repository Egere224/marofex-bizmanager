import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

function WhatsAppButton() {

  const [showTooltip, setShowTooltip] = useState(false);

  const phoneNumber = "2349079324580";
  const message = "Hello, I need help with BizManager.";

  const whatsappUrl =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >

      {/* Tooltip */}

      {showTooltip && (
        <div className="mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg animate-fade-in">
          Need help? Chat with us
        </div>
      )}

      {/* Button */}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
        relative
        bg-green-500
        hover:bg-green-600
        text-white
        p-4
        rounded-full
        shadow-lg
        transition
        duration-300
        hover:scale-110
        "
      >

        {/* Pulse ring */}

        <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping"></span>

        {/* Icon */}

        <FaWhatsapp size={28} className="relative z-10" />

      </a>

    </div>
  );
}

export default WhatsAppButton;