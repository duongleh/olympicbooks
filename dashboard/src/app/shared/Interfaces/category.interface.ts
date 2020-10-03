export interface Category {
  id: number;
  title: string;
  imgUrl: string;
  imgName: string;
  key: string;
  parent: Category;
  children: Category[];
  isLeaf: boolean;
}