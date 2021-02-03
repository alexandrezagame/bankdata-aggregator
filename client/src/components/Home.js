import React from 'react';

const Home = () => {
  const fetchData = async () => {
    const data = await (await fetch('http://localhost:8080/api/auth')).json();
    console.log(data);
    window.location = data.url;
  };

  return (
    <div>
      <h1>See your expenses</h1>
      <button type="submit" onClick={() => fetchData()}>
        FETCH YOUR DATA
      </button>
    </div>
  );
};

export default Home;
