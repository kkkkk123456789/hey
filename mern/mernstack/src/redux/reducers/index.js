import { combineReducers } from "redux";
import { productReducer,selectedProductReducer,addTocartReducer,myorderreducer, myorderdetailreducer,allvariantreducer} from "./productreducer";

const reducers = combineReducers({
    allProducts : productReducer,
    product : selectedProductReducer,
    cart : addTocartReducer,
    feorder :myorderreducer,
    fetchorderdetails : myorderdetailreducer,
    fetchallvarints : allvariantreducer
})

export default reducers