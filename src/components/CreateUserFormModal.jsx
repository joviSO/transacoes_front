import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isEmail } from 'validator';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateUserFormModal = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const watchPassword = watch('password');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/users', { user: data }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage('Usuário criado com sucesso!');
      toast.success('Usuário criado com sucesso!', { position: 'top-left' });
      console.log('Usuário criado com sucesso', response.data);
      navigate('/login');
      setModalIsOpen(false);
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message || error.response.data.error : error.message;
      setMessage(errorMessage);
      toast.error(errorMessage, { position: 'top-left' });
      console.error('Erro ao criar usuário', errorMessage);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setModalIsOpen(true)}>Criar Conta</Button>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Conta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text"
                            placeholder="Insira seu nome" {...register('username', {required: "Username é obrigatório"})} />
              {errors.username && <Form.Text className="text-danger">{errors.username.message}</Form.Text>}
            </Form.Group>
            <Form.Group>
              <Form.Label>E-mail:</Form.Label>
              <Form.Control type="email" placeholder="Insira seu e-mail" {...register("email", {
                required: "Email é obrigatório",
                validate: (value) => isEmail(value) || "Email inválido"
              })} />
              {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Senha:</Form.Label>
              <Form.Control type='password' placeholder="Insira sua senha" {...register('password', {
                required: "Password é obrigatório",
                minLength: {value: 6, message: "Password deve ter no mínimo 6 caracteres"},
                maxLength: {value: 20, message: "Password deve ter no máximo 20 caracteres"}
              })} />
              {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirmação de Senha:</Form.Label>
              <Form.Control type="password" placeholder="Re-insira sua senha" {...register("passwordConfirmation", {
                required: "Confirmação de senha é obrigatória",
                validate: (value) => value === watchPassword || "As senhas não coincidem"
              })} />
              {errors.passwordConfirmation &&
                <Form.Text className="text-danger">{errors.passwordConfirmation.message}</Form.Text>}
            </Form.Group>
            <Button variant="primary" type="submit">Criar Usuário</Button>
            {message && <p>{message}</p>}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateUserFormModal;