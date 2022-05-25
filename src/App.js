import React,{useState,useEffect,useRef} from "react";
import Books from "./books";

function App() {
  const [showBooks,setShowBooks]= useState([]);// to store input value
  const [listOfBooks,setListOfBooks] = useState([{ // to store books data
    titleURL:"",
    title:"",
    author:"",
    publisher:"",
    published:"",
    image:"",
  }]);
  const [temp,settemp]=useState(false); // check when books are loaded
  const listLength = listOfBooks.length;
  const [loading,setloading]=useState(false);// load true when search button clicks and helps to display content load msg
  const url ="https://www.googleapis.com/books/v1/volumes?q="+showBooks+"&_limit=10";
  const fetchBooks= (e) => {
    e.preventDefault();
    listLength > 1 && (setListOfBooks([{
      titleURL:"",
      title:"",
      author:"",
      publisher:"",
      published:"",
      image:"",
    }]))
    getUsers();
  }
    const getUsers = async () => {
      setloading(true); // call google api to fecth books data
      try{
        const response = await fetch(url);
        const books = await response.json();
        if(response.status===200){
        const list = books.items;
        list.map((book)=>{
        let displayBooks = {
          titleURL:book.volumeInfo.previewLink,
          title:book.volumeInfo.title,
          author:book.volumeInfo.authors,
          publisher:book.volumeInfo.publisher,
          published:book.volumeInfo.publishedDate,
          image:book.volumeInfo.imageLinks?(book.volumeInfo.imageLinks.thumbnail):null,
        };
        return list.length>0?(setListOfBooks(prevState=>[
            ...prevState,
            displayBooks,
          ])):(null);
        });
      }else{
        setloading(false);
      }
      }catch(error){
        setloading(false);
        console.log(error);
      }
    }

    useEffect(()=>{
      if(listLength >1 ){
        settemp(true);
        setloading(false);
      }

    },[listOfBooks])

    const handleClick = ()=>{ // clear when X button pressed
      return listLength > 1?(
        setShowBooks([]),
        setListOfBooks([{
          titleURL:"",
          title:"",
          author:"",
          publisher:"",
          published:"",
          image:"",
        }])
      ):(setShowBooks([]));
    }

  return (
    <div className="root">
      <div className="wrapper">
        <header>
        <h1>Book Finder</h1>
        </header>
        <div className="content">
          <div className="search-block">
          <div className="clear" style={ showBooks.length>0 ? { display:'block'} : {display : 'none'} } onClick={() => handleClick()}>
          <div className="clear-left"></div>
          <div className="clear-right"></div>
          </div>
          <input type="text-box" placeholder="Type author,book name,subject..." value={showBooks} onChange={(e)=>setShowBooks(e.target.value)}/>
          <button type="button" className="search-btn" onClick={fetchBooks}>Search</button>
          </div>
        </div>
        <div className="books">
        {temp===true && (listOfBooks.slice(1,listOfBooks.length).map((book,index)=>{
          return <Books key={index} book={book}/>
        }))}
        </div>
        {loading?(<div className="flash-info">Content is loading...</div>):(listLength === 1 && (<div className="flash-info">Nothing to show...</div>))}
        <footer>
        <h4>Made By:Silpa Alinedi</h4>
        </footer>
      </div>
    </div>
  );
}

export default App;
