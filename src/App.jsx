import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open/close state

  // Handle adding a new item to the list
  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, { name: newItem, count: 0 }]);
      setNewItem(""); // Reset the input field
    }
  };

  // Handle increasing the count of an item
  const handleIncrease = (index) => {
    const updatedItems = [...items];
    updatedItems[index].count += 1;
    setItems(updatedItems);
  };

  // Handle decreasing the count of an item
  const handleDecrease = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].count > 0) {
      updatedItems[index].count -= 1;
    }
    setItems(updatedItems);
  };

  // Reset counts to 0 for all items
  const handleResetCounts = () => {
    const resetItems = items.map((item) => ({ ...item, count: 0 }));
    setItems(resetItems);
  };

  // Clear all items from the list
  const handleClearList = () => {
    setItems([]);
    setIsModalOpen(false); // Close the modal after clearing the list
  };

  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{
        backgroundColor: "#00072D", // Set static background color
      }}
    >
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Manage List with Counts
        </h1>

        {/* Input to add new item */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="p-3 w-2/3 md:w-1/2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-black"
            placeholder="Add new item"
          />

          <button
            onClick={handleAddItem}
            className="ml-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
          >
            Add Item
          </button>
        </div>

        {/* List of items with counts */}
        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white text-gray-800 rounded-xl shadow-lg p-4"
              >
                <span className="text-xl font-semibold">{item.name}</span>
                <div className="flex items-center space-x-4">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-md transition duration-200"
                    onClick={() => handleIncrease(index)}
                  >
                    +
                  </button>
                  <span className="text-lg font-semibold">{item.count}</span>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md transition duration-200"
                    onClick={() => handleDecrease(index)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg font-semibold mt-6">
            No items in the list
          </p>
        )}

        {/* Buttons to reset counts or clear the list */}
        <div className="mt-8 flex justify-center space-x-6">
          <button
            onClick={handleResetCounts} // Reset counts without modal
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Reset Counts
          </button>
          <button
            onClick={() => setIsModalOpen(true)} // Open modal to clear list
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Clear List
          </button>
        </div>
      </div>

      {/* Modal for clear list confirmation */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)} // Close modal on clicking outside
        >
          <div
            className="bg-white text-black rounded-lg p-8 w-96"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <h2 className="text-2xl font-semibold text-center mb-4">
              Are you sure?
            </h2>
            <p className="text-center mb-6">
              This will clear all items from the list.
            </p>
            <div className="flex justify-center space-x-6">
              <button
                onClick={handleClearList}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
              >
                Yes, Clear
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
