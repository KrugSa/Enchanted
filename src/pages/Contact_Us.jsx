import { Box, Typography, Grid, Card, CardMedia, CardContent, FormControl, InputLabel, Select, MenuItem, Paper, TextField, Button } from "@mui/material";
import { BannerBackground, BannerTitle } from "../components/Banner/Banner_background";
import GreenLine from "../components/Green_Line/Green_line";
import TransitionSection from "../components/Transition/Transition";
import FooterSection from "../components/Footer/FooterSection";
import NavBarComponent from "../components/NavBar/NavBarComponent";


export function Contact_Us() {
    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', background: "#f6e8d7" }}>
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
                <BannerBackground imageUrl="public/assets/background/Tortuga_Galapagos_Tours.jpg" alt="Galapagos Tours">
                    <BannerTitle title="Galapagos Tours" sx={{ textTransform: 'uppercase' }} />
                </BannerBackground>
            </Box>

            <Box sx={{ paddingTop: '360px' }}>
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
                    {/* Resto del contenido  */}
                    <Paper elevation={3} sx={{ p: 4, maxWidth: 700, width: '100%', display: 'flex', gap: 4, alignItems: 'flex-start', background: "#fffbe9" }}>
                        {/* Imagen de contacto */}
                        <Box sx={{ minWidth: 120, display: { xs: 'none', sm: 'block' } }}>
                            <img
                                src="/themes/custom/galapagos/images/contact/icono-piquero.png"
                                alt="Contact Us"
                                style={{ width: 100, height: 100, objectFit: 'contain' }}
                            />
                        </Box>
                        {/* Formulario */}
                        <Box component="form" sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: "#3e3e3e" }}>
                                Contact Us
                            </Typography>
                            <TextField
                                label="Full Name"
                                name="nombre"
                                required
                                fullWidth
                                variant="outlined"
                                placeholder="Full Name"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                required
                                fullWidth
                                variant="outlined"
                                placeholder="Email"
                            />
                            <FormControl required fullWidth>
                                <InputLabel id="country-label">Select Country</InputLabel>
                                <Select
                                    labelId="country-label"
                                    name="select_country"
                                    defaultValue=""
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
                            <TextField
                                label="Phone"
                                name="phone"
                                required
                                fullWidth
                                variant="outlined"
                                placeholder="Phone"
                            />
                            <TextField
                                label="Message"
                                name="mensaje"
                                multiline
                                minRows={4}
                                fullWidth
                                variant="outlined"
                                placeholder="Message"
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                Submit
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>

            <TransitionSection image="src/assets/background/footer-transition.png" backgroundColor='#f6e8d7' height={230} />
            <FooterSection sx={{ marginTop: '500px' }} />
        </Box>
    );
}