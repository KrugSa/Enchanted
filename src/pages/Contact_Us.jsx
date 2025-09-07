import { Box, Typography, Grid, Card, CardMedia, CardContent, FormControl, InputLabel, Select, MenuItem, Paper, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { BannerBackground, BannerTitle } from "../components/Banner/Banner_background";
import GreenLine from "../components/Green_Line/Green_line";
import TransitionSection from "../components/Transition/Transition";
import FooterSection from "../components/Footer/FooterSection";
import NavBarComponent from "../components/NavBar/NavBarComponent";


export function Contact_Us() {
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        select_country: "",
        phone: "",
        mensaje: ""
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.ok) {
                setSnackbar({ open: true, message: "¡Mensaje enviado correctamente!", severity: "success" });
                setForm({ nombre: "", email: "", select_country: "", phone: "", mensaje: "" });
            } else {
                setSnackbar({ open: true, message: "Error al enviar el mensaje.", severity: "error" });
            }
        } catch {
            setSnackbar({ open: true, message: "Error de red al enviar el mensaje.", severity: "error" });
        }
        setLoading(false);
    };
    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', background: "#f6e8d7" }}>
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
            {/* NavBar */}
            <Box sx={{ position: 'relative', zIndex: 5 }}>
                <NavBarComponent />
            </Box>

            {/* Banner */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 700,
                    zIndex: 1,
                }}
            >
                <BannerBackground imageUrl="public/assets/background/masha.jpg" alt="Galapagos Tours">
                    <BannerTitle title="Contact Us" sx={{ textTransform: 'uppercase' }} />
                </BannerBackground>
            </Box>

            <Box sx={{ paddingTop: '360px', marginBottom: '40px' }}>
                <GreenLine
                    imageSrc="public/assets/icons/icon-boat.svg"
                    altText="boat Icon"
                    titleText="Browse your favorite tour below"
                />
                <Box
                    sx={{
                        minHeight: 'calc(100vh - 360px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '40px',
                        paddingBottom: '40px',
                    }}
                >
                    {/* Imagen de contacto */}
                    <Box sx={{ width: 500, height: 500, display: { xs: 'none', sm: 'block' }, alignItems: 'center' }}>
                        <img
                            src="public/assets/gifts/piquero.gif"
                            alt="Contact Us"
                            style={{ width: 500, height: 500, objectFit: 'contain' }}
                        />
                    </Box>
                    {/* Resto del contenido  */}
                    <Paper elevation={3} sx={{
                        p: 4, maxWidth: 700, width: '100%', display: 'flex', gap: 4, alignItems: 'flex-start', background: 'url("src/assets/background/backgroundAbout.png") center bottom no-repeat',
                        backgroundSize: 'cover', borderRadius: '20px'
                    }}>

                        {/* Formulario */}
                        <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Full Name"
                                name="nombre"
                                required
                                fullWidth
                                variant="outlined"
                                value={form.nombre}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#fff',
                                        borderRadius: '20px',
                                        '& fieldset': {
                                            borderColor: '#fff',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#ea9b11',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#ea9b11',
                                        },
                                    },
                                    '& label.MuiInputLabel-shrink': {
                                        color: '#ea9b11',
                                        top: '-12px', // Solo cuando sube (shrink)
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        color: '#ea9b11',
                                    },
                                    marginBottom: '10px',
                                }}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                required
                                fullWidth
                                variant="outlined"
                                value={form.email}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#fff',
                                        borderRadius: '20px',
                                        '& fieldset': {
                                            borderColor: '#fff',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#ea9b11',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#ea9b11',
                                        },
                                    },
                                    '& label.MuiInputLabel-shrink': {
                                        color: '#ea9b11',
                                        top: '-12px', // Solo cuando sube (shrink)
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        color: '#ea9b11',
                                    },
                                    marginBottom: '10px',
                                }} />
                            <FormControl required fullWidth sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#fff',
                                    borderRadius: '20px',
                                    '& fieldset': {
                                        borderColor: '#fff',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#ea9b11',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ea9b11',
                                    },
                                },
                                '& label.MuiInputLabel-shrink': {
                                    color: '#ea9b11',
                                    top: '-12px', // Solo cuando sube (shrink)
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: '#ea9b11',
                                },
                                marginBottom: '10px',
                            }}>
                                <InputLabel id="country-label">Select Country</InputLabel>
                                <Select
                                    labelId="country-label"
                                    name="select_country"
                                    value={form.select_country}
                                    onChange={handleChange}
                                    label="Select Country"
                                >
                                    <MenuItem value=""><em>- Select -</em></MenuItem>
                                    <MenuItem value="US">United States</MenuItem>
                                    <MenuItem value="CA">Canada</MenuItem>
                                    <MenuItem value="GB">United Kingdom</MenuItem>
                                    <MenuItem value="EC">Ecuador</MenuItem>
                                    <MenuItem value="AU">Australia</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#fff',
                                    borderRadius: '20px',
                                    '& fieldset': {
                                        borderColor: '#fff',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#ea9b11',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ea9b11',
                                    },
                                },
                                '& label.MuiInputLabel-shrink': {
                                    color: '#ea9b11',
                                    top: '-12px', // Solo cuando sube (shrink)
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: '#ea9b11',
                                },
                                marginBottom: '10px',
                            }}
                                label="Phone"
                                name="phone"
                                required
                                fullWidth
                                variant="outlined"
                                value={form.phone}
                                onChange={handleChange}
                            />
                            <TextField sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#fff',
                                        borderRadius: '20px',
                                        '& fieldset': {
                                            borderColor: '#fff',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#ea9b11',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#ea9b11',
                                        },
                                    },
                                    '& label.MuiInputLabel-shrink': {
                                        color: '#ea9b11',
                                        top: '-12px', // Solo cuando sube (shrink)
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        color: '#ea9b11',
                                    },
                                    marginBottom: '10px',
                                }}
                                label="Message"
                                name="mensaje"
                                multiline
                                minRows={4}
                                fullWidth
                                variant="outlined"
                                value={form.mensaje}
                                onChange={handleChange}
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#ea9b11', width: '100px' }} disabled={loading}>
                                {loading ? "Enviando..." : "Submit"}
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>

            <TransitionSection image="src/assets/background/footer-transition.png" backgroundColor='#f6e8d7' height={400} />
            <FooterSection sx={{ marginTop: '500px' }} />
        </Box>
    );
}