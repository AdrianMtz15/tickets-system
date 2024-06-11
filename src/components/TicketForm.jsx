import { useEffect, useState } from "react";
import { useZapierWebhook } from "../hooks/useZapierWebhook";

export function TicketForm() {
  const [email, setEmail] = useState('');
  const [ticket, setTicket] = useState({
    id: 1,
    product: 'gas',
    unit: 'liters',
    amount: 0,
    unitPrice: 0,
  });

  const generateId = () => {
    const min = 1e9;
    const max = 1e10 - 1;
    const random10DigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return random10DigitNumber;
  }

  useEffect(() => {
    setTicket({
      ...ticket,
      id: generateId()
    });
  }, []);

  const cleanTicket = () => {
    setTicket({
      id: generateId(),
      product: 'gas',
      unit: 'liters',
      amount: 0,
      unitPrice: 0,
    });
  }

  const { sendTicketData, getGoogleSheet } = useZapierWebhook();

  const handleChangeValue = (field) => {
    return (event) => {
      setTicket({
        ...ticket,
        [field]: event.target.value
      });
    }
  }

  const handleCreateTicket = async (event) => {
    event.preventDefault();
    const totalPayment = ticket.amount * ticket.unitPrice;
    ticket.totalPayment = totalPayment;
    ticket.email = email;

    await sendTicketData(ticket);
    cleanTicket();
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8 h-[100%]">
      <form onSubmit={handleCreateTicket} className="">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Ticket Form
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be saved in our google spreadsheet.
            </p>

            <div className="mt-10 grid grid-cols-12 gap-x-3 gap-y-4">
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <button
                  type="button"
                  className="rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => getGoogleSheet(email)}
                >
                  Send Google Sheet to my Email
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Ticket #{ticket.id}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Register ticket data.
            </p>

            <div className="mt-5 grid grid-cols-12 gap-x-6 gap-y-2 ">
              <div className="sm:col-span-full max-w-80">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product
                </label>
                <div className="mt-2">
                  <select
                    aria-placeholder="Select a product"
                    className="block  px-3  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChangeValue('product')}
                    value={ticket.product}
                  >
                    <option value={"gas"}>Gas</option>
                    <option value={"oil"}>Oil</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-full max-w-80">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Unit
                </label>
                <div className="mt-2">

                  <select
                    className="  px-3  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChangeValue('unit')}
                    value={ticket.unit}
                  >
                    <option value={"liters"}>Liters</option>
                    <option value={"barrels"}>Barrels</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-full max-w-80">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChangeValue('amount')}
                    type="number"
                    className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={ticket.amount}
                  />
                </div>
              </div>

              <div className="sm:col-span-full max-w-80">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Unit Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    onChange={handleChangeValue('unitPrice')}
                    className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={ticket.unitPrice}
                  />
                </div>
              </div>

              <div className="sm:col-span-full max-w-80 mt-5">
                <button
                  type="submit"
                  className="w-[100%] rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
