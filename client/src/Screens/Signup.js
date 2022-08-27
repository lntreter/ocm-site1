import React, { useState, useEffect } from "react";
import { Container, Form, Button, FormGroup, Row, Col, FormLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import toast from "react-hot-toast";

import { register } from "../axios";

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    password: "",
    correctionPassword: "",
    phoneNumber: "",
    email: "",
  });
  const [disabled, setDisabled] = useState(true);


  useEffect(() => {
    if(formData.password.length >= 8 && formData.fullname.length > 3 && formData.phoneNumber.length > 10 && formData.email.length > 3 && formData.password === formData.correctionPassword){
      setDisabled(false);
    }else{
      setDisabled(true);
    }
  } ,[formData]);

  useEffect(() => {
    setFormData({ ...formData, phoneNumber: phoneNumber });
  } ,[phoneNumber]);

  const handleChange = (e) => {console.log(formData)}
  
return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form onSubmit={(e) => {
            e.preventDefault();
            register(formData).then((res) => {
              toast.success("Kullanıcı başarıyla oluşturuldu.");
              navigate("/auth");
            }).catch((err) => {
              toast.error(err.response.data.message);
            }).finally(() => {
              setFormData({
                fullname: "",
                password: "",
                correctionPassword: "",
                phoneNumber: "",
                email: "",
              })
             
            })
          } }
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Ad Soyad</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
                type="name"
                placeholder="Bekir İngavas"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email adresi</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                placeholder="örnek@adres.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                placeholder="********"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Şifreyi tekrar girin</Form.Label>
              <Form.Control
              onChange={(e) =>{
                setFormData({ ...formData, correctionPassword: e.target.value })}}
                type="password"
                placeholder="********"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Telefon Numarası</Form.Label>
              <PhoneInput value={phoneNumber} onChange={setPhoneNumber} defaultCountry="TR"
              placeholder="555 555 55 55" />
            </Form.Group>
            <Form.Group className="d-grid">
              <Button disabled={disabled}
               variant="primary"
               type="submit"
               className="mt-4 text-white text-decoration-none">Kaydol!
              </Button>
            </Form.Group>
          </Form>
          <div
            style={{display: "flex", justifyContent: "center", flexDirection: "column", textAlign:"center", marginTop:"10px"}}>
            <p style={{color: "text-white", display: formData.password.length >= 8 && "none"}}>
              *Şifreniz en az 8 karakterden oluşmalıdır.
            </p>
            <p style={{color: "text-white", display: formData.fullname.length >= 5 && "none"}}>
              *İsminiz en az 5 karakterden oluşmalıdır.
            </p>
            <p style={{color: "text-white", display: formData.password === formData.correctionPassword && "none" }}>
              *Şifreleriniz uyuşmuyor.
            </p>
            
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default SignUpScreen;