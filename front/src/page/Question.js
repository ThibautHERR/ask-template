import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useMutation } from "react-query";
import { useHistory } from "react-router";
import api from "../api";

export default function Question() {
  const history = useHistory();

  const [author, setAuthor] = useState("");
  const [type, setType] = useState("question");
  const [question, setQuestion] = useState("");

  const { mutate: addQuestion } = useMutation(api.questions.addQuestion, {
    onSuccess: () => {
      history.push("/");
    },
  });

  function handleAdd() {
    if (question) {
      addQuestion({
        author: author ? author : undefined,
        type,
        question,
      });
    }
  }

  return (
    <Container>
      <h1>Poser une question</h1>

      <Form.Group>
        <Form.Label>Votre nom</Form.Label>
        <Form.Control
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="question">Question</option>
          <option value="action">Action</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Question/Action</Form.Label>
        <Form.Control
          as="textarea"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          isInvalid={question === ""}
          rows={5}
        />
      </Form.Group>

      <Button
        onClick={handleAdd}
        disabled={!question}
        style={{ marginTop: "10px" }}
      >
        Ajouter
      </Button>
    </Container>
  );
}
