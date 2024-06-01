import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

const CreateTransactionFormModal = ({ isOpen, setIsOpen }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const token = Cookies.get('token');

  const handleClose = () => setIsOpen(false);

  const onSubmit = async (data) => {
    const [card_expiry_month, card_expiry_year] = data.card_expiry.split('/');
    const status = 0

    const transaction = {
      ...data,
      card_expiry_month,
      card_expiry_year,
      status,
    };

    try {
      const response = await axios.post('http://localhost:3001/transactions', transaction, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error('Erro ao criar transação', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Transação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Valor:</Form.Label>
            <Form.Control className="no-spinner" type="number" placeholder="Insira o valor da transação" {...register('amount', { required: true })} />
            {errors.amount && <Form.Text className="text-danger">Valor é obrigatório</Form.Text>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Número do Cartão:</Form.Label>
            <Form.Control type="text" placeholder="Insira o número do cartão" {...register('card_number', { required: true })} />
            {errors.card_number && <Form.Text className="text-danger">Número do cartão é obrigatório</Form.Text>}
          </Form.Group>
          <Form.Group as={Row}>
            <Col>
              <Form.Label>Expiração do Cartão:</Form.Label>
              <InputMask mask="99/9999" placeholder="MM/AA" {...register('card_expiry', { required: true })}>
                {(inputProps) => <Form.Control {...inputProps} type="text" />}
              </InputMask>
              {errors.card_expiry && <Form.Text className="text-danger">Expiração do cartão é obrigatória</Form.Text>}
            </Col>
            <Col>
              <Form.Label>CVV do Cartão:</Form.Label>
              <Form.Control type="text" placeholder="Insira o CVV do cartão" {...register('card_cvv', { required: true })} />
              {errors.card_cvv && <Form.Text className="text-danger">CVV do cartão é obrigatório</Form.Text>}
            </Col>
          </Form.Group>
          <Button variant="primary" type
          ="submit">Criar Transação</Button>
        </Form>
      </Modal.Body>
    </Modal>
   );
};

export default CreateTransactionFormModal;