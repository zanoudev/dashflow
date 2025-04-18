export const writeFile = (filePath: string, data: object) => {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      localStorage.setItem(filePath, jsonData); // ✅ Simulating JSON write
    } catch (error) {
      console.error("Error writing file:", error);
    }
  };
  
  // ✅ Load JSON Data
  export const readFile = (filePath: string) => {
    const jsonData = localStorage.getItem(filePath);
    return jsonData ? JSON.parse(jsonData) : null;
  };
  