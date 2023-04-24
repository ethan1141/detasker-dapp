export interface ILink {
  component?: string;
  name: string;
  path?: string;
  dropdown?: ILink[];
  dropdownName?: string;
  seperator?: boolean;
}

export function generateLink(link: ILink) {
  let str = "";
  if (link.path) {
    str = link.path;
  } else {
    const words = link.name.toLowerCase().split(" ");
    for (let index = 0; index < words.length; index++) {
      const element = words[index];
      str += element.substring(0, 1).toUpperCase() + element.substring(1);
    }
  }
  return str;
}
