const fetch = require("node-fetch");

//get genres
async function getGenre(title) {
  const response = await fetch(
    `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
  );
  const data = await response.json();
  // check for a selection of 1 or more books
  if (data.docs.length > 0) {
    const firstBook = data.docs[0]; //get first book
    const bookKey = firstBook.key; //get the key
    const bookResponse = await fetch(`https://openlibrary.org${bookKey}.json`); //fetch the books data
    const bookData = await bookResponse.json(); //parse

    if (bookData.subjects && bookData.subjects.length > 0) {
      //get subject names, and delete unneeded punctuation
      const bookSubjects = bookData.subjects.slice(0, 5).map((subject) => {
        let sanitizedSubject = subject.replace(/,|\(|\)|'/g, "");
        sanitizedSubject = sanitizedSubject.replace(/\s+/g, " ");
        return sanitizedSubject;
      });
      //trying to see if we filter through subjects to remove the word fiction it will log
      const filteredSubjects = bookSubjects.filter((subject) => {
        const words = subject.split(" ");
        if (words[words.length - 1].toLowerCase() === "fiction") {
          words.pop();
        }
        return words.join(" ");
      });
      return {
        title: firstBook.title,
        author: firstBook.author_name[0],
        subjects: filteredSubjects
      };
    } else {
      throw new Error(`Genre not found for ${title}`);
      
    }
  } else {
    throw new Error(`Book not found or ${title}`);
  }
}

async function getBooksByGenre(genres) {
 
  if (Array.isArray(genres) && genres.length > 0) {
    let books= []
    for (let j = 0; j < genres.length; j++) {
      let searchApi = `https://openlibrary.org/subjects/${encodeURIComponent(
        genres[j]
      )}.json`; //get search for each genre

      try {
        const searchResponse = await fetch(searchApi); //get the results
        if (!searchResponse.ok) {
          throw new Error(`HTTP error! status: ${searchResponse.status}`); //error check
          
        }
        let searchData;
        try {
          searchData = await searchResponse.json(); //parse
        } catch (error) {
          throw new Error(
            `Invalid JSON response from server for genre: ${genres[j]}`
          );
          
        }

        if (searchData.works && searchData.works.length > 0) {
          // console.log(`Books found for genre: ${genres[j]}`);

          for (let i = 0; i < searchData.works.length; i++) {
            //checking for subject
            if (
              searchData.works[i].subject &&
              searchData.works[i].subject.length > 0 &&
              searchData.works[i].authors &&
              searchData.works[i].authors.length > 0
            ) {
              books.push ({
                title: searchData.works[i].title,
                author: searchData.works[i].authors[0].name,
                subject: searchData.works[i].subject
              })
            } else if (
              searchData.works[i].authors &&
              searchData.works[i].authors.length > 0
            ) {
            books.push ({
              title: searchData.works[i].title, 
              author: searchData.works[i].authors[0].name
            })
            } else {
              books.push ({title: searchData.works[i].title})
            }
          }
        } else {
          throw new Error(`No books found for genre: ${genres[j]}`);
        }
      } catch (error) {
        throw new Error(`Fetch error: ${error.message}`);
      }
    }
    return books;
  } else {
    throw new Error("Please provide a genre");
  }
}

async function getBooksByAuthor(author) {
  const response = await fetch(
    `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(
      author
    )}`
  );
  const data = await response.json();
  // check for a selection of 1 or more books
  if (data.docs.length > 0) {
    const firstAuthor = data.docs[0]; //get first book
    const authorKey = firstAuthor.key; //get the key
    const worksResponse = await fetch(
      `https://openlibrary.org/authors/${authorKey}/works.json`
    ); //fetch the books data

    let workData;
    try {
      workData = await worksResponse.json(); //parse
    } catch (error) {
      console.log(`Invalid JSON response from server for author: ${author}`);
      throw new Error(
        `Invalid JSON response from server for author: ${author}`
      );
    }

    if (workData.entries && workData.entries.length > 0) {
      console.log(`Books found for author: ${author}`);

      for (let i = 0; i < workData.entries.length; i++) {
        console.log(`- ${workData.entries[i].title} `);
      }
    } else {
      console.log(`No books found for author: ${author}`);
    }
  } else {
    console.log("Author not found");
  }
}


async function getBooksByAuthor(author) {
  let works = []
  const response = await fetch(
    `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(
      author
    )}`
  );
  const data = await response.json();
  // check for a selection of 1 or more books
  if (data.docs.length > 0) {
    const firstAuthor = data.docs[0]; //get first book
    const authorKey = firstAuthor.key; //get the key
    const worksResponse = await fetch(
      `https://openlibrary.org/authors/${authorKey}/works.json`
    ); //fetch the books data

    let workData;
    try {
      workData = await worksResponse.json(); //parse
    } catch (error) {
      console.log(`Invalid JSON response from server for author: ${author}`);
      throw new Error(
        `Invalid JSON response from server for author: ${author}`
      );
    }

    if (workData.entries && workData.entries.length > 0) {

      for (let i = 0; i < workData.entries.length; i++) {
        works.push({
          title: workData.entries[i].title,
          subject: workData.entries[i].subject
        });
      }
    } else {
      throw new Error(`No books found for author: ${author}`);
    }
    return works
  } else {
    throw new Error("Author not found");
  }
}


