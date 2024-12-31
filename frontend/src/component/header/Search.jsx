import { useState,useEffect } from "react";


import { InputBase , Box , styled,List, ListItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productActions"
import { Link } from "react-router-dom";

const SearchContainer = styled(Box)`
    background: #fff;
    width: 30%;
    border-radius: 13px;
    margin-left: 15%;
    margin-top: 5px;
    display: flex;
`;

const ListWrapper = styled(List)`
    position: absolute;
    background: #212121;
    margin-top: 36px;
`

const InputSearchBase = styled(InputBase)`
    padding-left: 10px;
    width: 100%;
    color: #212121;
    font-size: unset;
    font-weight: 600px;
`;

const SearchIconWrapper = styled(Box)`
    color: #212121;
    padding:  4px;
    marging: 13px;
`

const Search = () => {

    const [text, setText]= useState('');

    const { products } = useSelector(state => state.getProducts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const getText = (text) => {
        setText(text);
    }

    return(
        <SearchContainer>
            <InputSearchBase 
            placeholder="Search For Dress,Krutis...."
            onChange={(e) => getText(e.target.value)}
            value={text}
            />
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            {
                text &&
                    <ListWrapper>
                        {
                        products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product =>(
                            <ListItem>
                                <Link
                                to={`/product/${product.id}`}
                                onClick={() => setText('')}
                                style={{ textDecoration: 'none', color: '#fff'}}
                                >
                                  {product.title.longTitle}
                                </Link>
                            </ListItem>
                        ))
                        }
                    </ListWrapper>
            }
        </SearchContainer>
    )
} 

export default Search;