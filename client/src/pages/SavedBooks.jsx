// imports
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { GET_ME } from '../utils/queries';
import { removeBookId } from '../utils/localStorage';
import { BOOK_REMOVE } from '../utils/mutations';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});
  const { loading, data } = useQuery(GET_ME);
  const [BookRemove] = useMutation(BOOK_REMOVE);


  const handleDeleteBook = async (bookId) => {
    try {
      const { data } = await BookRemove({
        variables: { bookId },
      });
      setUserData(data.removeBook);
      removeBookId(bookId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data) {
      setUserData(data.me);
    }
  }, [data]);

  if (loading) {
    return <h2>LOADING...</h2>;
  }


  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks && userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks ? (
            userData.savedBooks.map((book) => (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p>No saved books available.</p>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
