import React, { useState} from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../axios";
import toast from "react-hot-toast";

const Auth  = ({setUser}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    return(
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Form onSubmit={
                        (e) => {
                            e.preventDefault();
                            login(formData).then((res) =>{ 
                                localStorage.setItem("user", JSON.stringify(res.data.user))
                                setUser(res.data.user);
                                toast.success("Başarıyla giriş yapıldı.");
                                navigate("/");
                                })
                                .catch((err) =>
                              toast.error(err.response.data.message));
                        }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email adresi</Form.Label>
                            <Form.Control onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" placeholder="örnek@adres.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Şifre</Form.Label>
                            <Form.Control onChange={(e) => setFormData({...formData, password: e.target.value})}
                             type="password" placeholder="******" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Beni hatırla!" />
                        </Form.Group>
                        <Form.Group className="d-grid">
                            <Button
                             disabled={!formData.email || !formData.password}
                             variant="primary" 
                             type="submit">
                                GİRİş Yap
                            </Button>
                            <Form.Text className="text-center mt-2">
                                Bir hesabın yok mu? <Link className="text-decoration-none" to="/auth/up">Kaydol!</Link>
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>        
        </Container>
    )
};

export default Auth;