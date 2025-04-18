import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Grid,
    Pagination
} from '@mui/material';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const LogList = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({
        type: '',
        status: '',
        startDate: '',
        endDate: ''
    });

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            let url = `http://localhost:5000/api/logs?page=${page}`;

            // Filtreleri URL'ye ekle
            if (filters.type) url += `&type=${filters.type}`;
            if (filters.status) url += `&status=${filters.status}`;
            if (filters.startDate) url += `&startDate=${filters.startDate}`;
            if (filters.endDate) url += `&endDate=${filters.endDate}`;

            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setLogs(response.data.data);
            setTotalPages(response.data.pagination.totalPages);
        } catch (err) {
            setError('Loglar yüklenirken bir hata oluştu');
            console.error('Log yükleme hatası:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [page, filters]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
        setPage(1); // Filtre değişince sayfa 1'e dön
    };

    const handleCleanupLogs = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/logs/cleanup`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchLogs(); // Logları yeniden yükle
        } catch (err) {
            setError('Eski loglar silinirken bir hata oluştu');
            console.error('Log temizleme hatası:', err);
        }
    };

    if (loading) return <Typography>Yükleniyor...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ width: '100%', mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Log Kayıtları</Typography>

            {/* Filtreler */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <InputLabel>Log Türü</InputLabel>
                        <Select
                            name="type"
                            value={filters.type}
                            label="Log Türü"
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="">Tümü</MenuItem>
                            <MenuItem value="info">Bilgi</MenuItem>
                            <MenuItem value="warning">Uyarı</MenuItem>
                            <MenuItem value="error">Hata</MenuItem>
                            <MenuItem value="security">Güvenlik</MenuItem>
                            <MenuItem value="audit">Denetim</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <InputLabel>Durum</InputLabel>
                        <Select
                            name="status"
                            value={filters.status}
                            label="Durum"
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="">Tümü</MenuItem>
                            <MenuItem value="success">Başarılı</MenuItem>
                            <MenuItem value="failure">Başarısız</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        type="date"
                        name="startDate"
                        label="Başlangıç Tarihi"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        type="date"
                        name="endDate"
                        label="Bitiş Tarihi"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tarih</TableCell>
                            <TableCell>Tür</TableCell>
                            <TableCell>İşlem</TableCell>
                            <TableCell>Kullanıcı</TableCell>
                            <TableCell>IP Adresi</TableCell>
                            <TableCell>Durum</TableCell>
                            <TableCell>Detaylar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log._id}>
                                <TableCell>
                                    {format(new Date(log.createdAt), 'dd MMMM yyyy HH:mm', { locale: tr })}
                                </TableCell>
                                <TableCell>{log.type}</TableCell>
                                <TableCell>{log.action}</TableCell>
                                <TableCell>{log.user?.fullName || 'Bilinmiyor'}</TableCell>
                                <TableCell>{log.ipAddress}</TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            backgroundColor: log.status === 'success' ? 'success.light' : 'error.light',
                                            color: log.status === 'success' ? 'success.dark' : 'error.dark',
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 1,
                                            display: 'inline-block'
                                        }}
                                    >
                                        {log.status === 'success' ? 'Başarılı' : 'Başarısız'}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    {typeof log.details === 'object'
                                        ? JSON.stringify(log.details, null, 2)
                                        : log.details}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Sayfalama */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default LogList; 