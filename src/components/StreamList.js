function StreamList() {
    const handleInput = (e) => {
      console.log(e.target.value);
    };
  
    return (
      <div className="streamlist-container">
        <h2>StreamList</h2>
        <input type="text" placeholder="Add a movie" onChange={handleInput} />
      </div>
    );
  }
  
  export default StreamList;
  