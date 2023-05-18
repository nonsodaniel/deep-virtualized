import { IListData } from "../../../store/actions/types";
import Card from "../../views/Card";
import "./listcard.scss";

interface IListCard {
  item: IListData;
}

const ListCard = ({ item }: IListCard) => {
  return (
    <div className="">
      <Card list={item} />
    </div>
  );
};

export default ListCard;
