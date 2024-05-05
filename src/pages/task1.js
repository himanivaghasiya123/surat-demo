import React from 'react'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Box, Chip, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EastIcon from '@mui/icons-material/East';
import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import {useInterceptor} from '../interceptor';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useLoader } from '../loaderContext';

export default function Task1() {
    const [tableData, setTableData] = useState([])
    const [serachDetails, setSerachDetails] = useState({ page: 1, limit: 15 })
    const [isLastPage, setIsLastPage] = useState(false)
    const [totalCounts, setTotalCounts] = useState(0)
    const [serachValue, setSerachValue] = useState(null)
    const axiosWithInterceptor = useInterceptor();
    const {loader} = useLoader();

    const getDataHandler = () => {
        axiosWithInterceptor.get(`https://api.jikan.moe/v4/characters?page=${serachDetails?.page}&limit=${serachDetails?.limit}&q=${serachValue || ''}&order_by=favorites&sort=desc`)
            .then((res) => {
                setTableData(res?.data?.data)
                setTotalCounts(res?.data?.pagination?.items?.total)
                setIsLastPage(res?.data?.pagination?.has_next_page)
            }).catch((err) => {
            });
    }

    useEffect(() => {
        if (serachValue != null) {
            let timer = setTimeout(() => getDataHandler(), 1000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [serachValue])

    useEffect(() => {
        getDataHandler()
    }, [serachDetails])

    return (
        <Box className="App">
            <Box className='search-anime'>
                <Typography variant="h5" className='main-header'>
                    Search Anime characters
                </Typography>
                <TextField
                    fullWidth
                    id="input-with-icon-textfield"
                    label=""
                    placeholder='Search...'
                    
                    className='search-input'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize='small' />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setSerachValue(e.target.value)}
                    variant="outlined"
                />
                <Box>
                    <Typography variant="p" >
                        Total {totalCounts} matching anime characters found
                    </Typography>
                </Box>

            </Box>
            {loader ? <Box className='loader'><CircularProgress /></Box> : <>  {tableData?.length <= 0 ? <Box className="not-found-data">Not Data Found</Box> : <Box className='anime-details'> {tableData?.map((data) =>
                <Card variant="outlined" className='card-wrapper'>
                    <Box component="div" className="card-details">
                        <CardMedia
                            component="img"
                            height="60"
                            image={data?.images?.jpg?.image_url}
                            alt="Paella dish"
                        />
                        <Box component="div" className='card-info' >
                            <Typography variant="p" color="text.secondary">
                                {data?.name}
                            </Typography>
                            <Box component="div">
                                {data?.nicknames?.map((nickname) =>
                                    <Chip label={nickname} className='card-chip' />
                                )}
                            </Box>
                        </Box>
                    </Box>
                    <Box component="div" className="card-details">
                        <Box component="div" className='like-box'>
                            <FavoriteIcon color='error' />
                            <Typography variant="p" color="text.secondary">
                                {data.favorites}
                            </Typography>
                        </Box>
                        <Box component="div" className='link-box'>
                            <Link href={data.url} target="_blank"><EastIcon />  </Link>
                        </Box>
                    </Box>
                </Card>
            )}</Box>}</>
            }
            <Box className="paginate-buttons">
                <Button variant="contained" disabled={serachDetails?.page <= 1} onClick={() => setSerachDetails({ ...serachDetails, page: serachDetails?.page - 1 })}>Back</Button>
                <Button variant="outlined" disabled={!isLastPage} onClick={() => setSerachDetails({ ...serachDetails, page: serachDetails?.page + 1 })}>Next</Button>
            </Box>

        </Box>
    )
}
