document.getElementById('add-book-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
  
    const bookData = {
      title: title,
      author: author,
      description: description
    };
  
    fetch('/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Книга додана!');
        document.getElementById('add-book-form').reset();
      } else {
        alert('Помилка при додаванні книги.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  
  function displayBooks() {
    fetch('/getBooks')
      .then(response => response.json())
      .then(books => {
        const booksContainer = document.getElementById('books-list');
        booksContainer.innerHTML = '';
  
        books.forEach(book => {
          const bookItem = document.createElement('div');
          bookItem.className = 'book-item';
          bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p>Автор: ${book.author}</p>
            <a href="book.html?id=${book.id}">Читати</a>
          `;
          booksContainer.appendChild(bookItem);
        });
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }
  
  window.onload = displayBooks;
  