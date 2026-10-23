/**
 * WhatsApp integration utility for The Haweli Resort
 * Official Number: +91 8102891308
 */

export const HAWELI_WHATSAPP_NUMBER = '918102891308';
export const HAWELI_DISPLAY_PHONE = '+91 8102891308';

export const getWhatsAppUrl = (message: string) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${HAWELI_WHATSAPP_NUMBER}?text=${encoded}`;
};

export const openWhatsApp = (message: string) => {
  const url = getWhatsAppUrl(message);
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }
  } catch {
    window.location.href = url;
  }
};

export const createQuickBookingWhatsAppMessage = (data: {
  guestName: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomPreference?: string;
  note?: string;
}) => {
  return `🏰 *NEW ROOM BOOKING REQUEST - THE HAWELI RESORT* 🏰
------------------------------------------
*Guest Name:* ${data.guestName}
*Contact Phone:* ${data.guestPhone}
*Check-in Date:* ${data.checkIn}
*Check-out Date:* ${data.checkOut}
*Number of Guests:* ${data.guests} Guest(s)
${data.roomPreference ? `*Preferred Room:* ${data.roomPreference}\n` : ''}${data.note ? `*Note / Request:* ${data.note}\n` : ''}------------------------------------------
_Please confirm room availability and tariff. Thank you!_`;
};

export const createBookingWhatsAppMessage = (data: {
  bookingId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  specialRequests?: string;
  airportTransfer: boolean;
  dinnerPackage: boolean;
  totalAmount: number;
}) => {
  return `🏰 *OFFICIAL ROOM RESERVATION - THE HAWELI RESORT* 🏰
------------------------------------------
*Booking Ref:* ${data.bookingId}
*Guest Name:* ${data.guestName}
*Phone:* ${data.guestPhone}
*Email:* ${data.guestEmail || 'Not provided'}

*Accommodation:* ${data.roomName}
*Check-in:* ${data.checkIn}
*Check-out:* ${data.checkOut}
*Duration:* ${data.nights} Night(s)
*Guests:* ${data.guests} Guest(s)

*Add-ons:*
• Airport/Station Transfer: ${data.airportTransfer ? 'Yes (Requested)' : 'No'}
• Royal Candlelight Dinner: ${data.dinnerPackage ? 'Yes (Requested)' : 'No'}

*Special Requests:* ${data.specialRequests || 'None'}
*Total Amount Payable at Check-in:* ₹${data.totalAmount.toLocaleString('en-IN')}
------------------------------------------
_Sent via The Haweli Resort Official Booking Engine_`;
};

export const createDiningOrderWhatsAppMessage = (data: {
  guestName: string;
  guestPhone: string;
  tableOrRoom: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  tax: number;
  total: number;
  note?: string;
}) => {
  const itemsText = data.items
    .map((item) => `• ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`)
    .join('\n');

  return `🍽️ *HAWELI RESTAURANT - NEW DINING ORDER* 🍽️
------------------------------------------
*Customer Name:* ${data.guestName}
*Contact Phone:* ${data.guestPhone}
*Deliver To:* ${data.tableOrRoom}
*Time:* ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

*Ordered Dishes:*
${itemsText}

------------------------------------------
*Subtotal:* ₹${data.subtotal.toLocaleString('en-IN')}
*GST (5%):* ₹${data.tax.toLocaleString('en-IN')}
*Total Bill:* ₹${data.total.toLocaleString('en-IN')}
${data.note ? `*Cooking Note:* ${data.note}\n` : ''}------------------------------------------
_Sent from Haweli Restaurant Digital Menu_`;
};

export const createTableReservationWhatsAppMessage = (data: {
  referenceId: string;
  guestName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingZone: string;
}) => {
  return `🥂 *TABLE RESERVATION - HAWELI RESTAURANT* 🥂
------------------------------------------
*Table Code:* ${data.referenceId}
*Guest Name:* ${data.guestName}
*Contact Phone:* ${data.phone}

*Reservation Date:* ${data.date}
*Time Slot:* ${data.time}
*Number of Guests:* ${data.guests}
*Preferred Seating:* ${data.seatingZone}
------------------------------------------
_Please confirm table allocation. Thank you!_`;
};

export const createEventInquiryWhatsAppMessage = (data: {
  hostName: string;
  phone: string;
  eventType: string;
  estimatedGuests: number;
  eventDate: string;
  venuePreference?: string;
}) => {
  return `✨ *BANQUET & WEDDING INQUIRY - THE HAWELI RESORT* ✨
------------------------------------------
*Host Name:* ${data.hostName}
*Contact Phone:* ${data.phone}
*Occasion Type:* ${data.eventType}
*Proposed Date:* ${data.eventDate}
*Estimated Guests:* ${data.estimatedGuests} Pax
*Preferred Venue:* ${data.venuePreference || 'Sheesh Mahal / Starlight Marriage Lawn'}
------------------------------------------
_Requesting quotation and date availability review._`;
};

export const createContactInquiryWhatsAppMessage = (data: {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return `📩 *CONCIERGE INQUIRY - THE HAWELI RESORT* 📩
------------------------------------------
*From:* ${data.name}
*Phone:* ${data.phone}
*Email:* ${data.email || 'Not provided'}
*Subject:* ${data.subject}

*Message:*
${data.message}
------------------------------------------
_Sent via The Haweli Resort Website Concierge_`;
};
