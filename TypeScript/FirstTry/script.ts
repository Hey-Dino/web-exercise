const url: string = 'https://api.thecatapi.com/v1/images/search';
const button: HTMLButtonElement | null = document.querySelector("button");
const tableBody: HTMLTableElement | null = document.querySelector('#table-body');

/* 接口 */
interface CatType {
    id: string;
    url: string;
    height: number;
    width: number;
    test?: boolean;
}

/* 接口实现类 */
class Cat implements CatType {
    id: string;
    url: string;
    height: number;
    width: number;

    constructor(id: string, url: string, height: number, width: number) {
        this.id = id;
        this.url = url;
        this.height = height;
        this.width = width;
    }
}

class WebDisplay {
    /* 公有静态方法，无返回值 */
    public static addData(data: CatType): void {
        // 创建 Cat类 实例对象
        const cat: Cat = new Cat(data.id, data.url, data.height, data.width);
        // 创建 DOM元素
        const tableRow: HTMLTableRowElement = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${cat.id}</td>
            <td><img src="${cat.url}"></td>
            <td>${cat.height}</td>
            <td>${cat.width}</td>
            <td>${cat.url}</td>
            <td><a href="#">X</a></td>
        `;
        // 在tbody中插入新创建的DOM元素
        tableBody?.appendChild(tableRow);
    }

    public static deleteData(deleteButton: HTMLAnchorElement): void {
        // 此处使用了断言
        const td = deleteButton.parentElement as HTMLTableCellElement;
        const tr = td.parentElement as HTMLTableRowElement;
        tr.remove();
    }
}

/* 获取 Promise */
async function getJSON<T>(url: string): Promise<T> {
    const response: Response = await fetch(url);
    const json: Promise<T> = await response.json();

    return json;
}

/* 获取实际数据 */
async function getData(): Promise<void> {
    try {
        const json: CatType[] = await getJSON<CatType[]>(url);
        const data: CatType = json[0];
        WebDisplay.addData(data);
    } catch (error: Error | unknown) {
        let message: string;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error);
        }

        console.log(message);
    }
}

/* 增加按钮监听事件 <'click'>可以避免事件写错 */
button?.addEventListener<'click'>('click', getData);

tableBody?.addEventListener<'click'>('click', (ev: MouseEvent)=>{
    // 避免删除按钮不存在时报错，因而使用<>注明类型
    WebDisplay.deleteData(<HTMLAnchorElement>ev.target)
})