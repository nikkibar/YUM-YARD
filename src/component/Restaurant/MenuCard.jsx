import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { categorizeIngredients } from "../util/categorizeIngredients";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart} from "../State/Cart/Action";


const MenuCard = ({ item, auth }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();
  const {menu} = useSelector((store) => store);

  const handleCheckBoxChange = (itemName) => {
    console.log(itemName);
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== itemName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };

  const handleAddItemToCart = (e) => {
    
    e.preventDefault(); 
    const reqData = {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
    };
    console.log("request add item to cart data", reqData);
    dispatch(addItemToCart({
        token: localStorage.getItem("jwt"),
        ...reqData
    }));
};

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="lg:flex items-center justify-between">
            <div className="lg:flex items-center lg:gap-5">
              <img
                className="w-[7rem] h-[7rem] object-cover"
                src={item.images[0]}
                alt="Burger"
              />
              <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                <p className="font-semibold text-xl">{item.name}</p>
                <p>₹ {item.price}</p>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddItemToCart}>
            <div className="flex gap-5 flex-wrap">
              {Object.keys(categorizeIngredients(item.ingredients)).map(
                (category) => (
                  <div>
                    <p className="font-semibold">{category}</p>
                    <FormGroup>
                      {categorizeIngredients(item.ingredients)[category].map(
                        (item) => (
                          <FormControlLabel
                            key={item.id}
                            control={
                              <Checkbox
                                onChange={() => handleCheckBoxChange(item.name)}
                                disabled={!item.inStock}
                              />
                            }
                            label={item.name}
                          />
                        )
                      )}
                    </FormGroup>
                  </div>
                )
              )}
            </div>
            <div className="mt-4">
              <Button
                variant="contained"
                disabled={auth?.user.role !== "ROLE_CUSTOMER" || !item.available}
                type="submit"
              >
                {item.available?"Add to Cart":"Out of Stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MenuCard;
