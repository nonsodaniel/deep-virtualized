import { IListData } from "../../../store/actions/types";

interface IListCard {
  item: IListData;
}

const ListCard = ({ item }: IListCard) => {
  console.log("item", item);
  return <div className="">{"hello"}</div>;
};

export default ListCard;
