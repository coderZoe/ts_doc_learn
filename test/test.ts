interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: null;
    hireable: null;
    bio: string;
    twitter_username: null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}


async function test() {
    let url = 'https://api.github.com/users/coderzoe';
    let response = await fetch(url)
    let user: User = await response.json(); //通过js的强类型
    console.log(user.login);
}


async function process() {
    let url: string = "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100";
    const response = await fetch(url);
    const reader = response.body!.getReader();
    // console.log('aaa', response.headers.get("Content-Length"));
    console.log('aaa', response.headers.get("Transfer-Encoding"));
    const totalLength = Number(response.headers.get("Content-Length"));
    let received = 0;
    while (true) {
        const { done, value } = await reader!.read();
        if (done) {
            console.log(`总共需要接收${totalLength},现在接收${received}`);
            break;
        }
        received += value.length;
        console.log(`总共需要接收${totalLength},现在接收${received}`);
    }
}


async function abort() {
    let controller = new AbortController();
    controller.signal.addEventListener("abort", event => {
        console.log("任务停止");
    });
    let url = "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100";
    let response = await fetch(url, {
        signal: controller.signal
    });
    setTimeout(() => {
        //调用终止操作
        controller.abort();
    }, 100);

}
test()
process();
abort();