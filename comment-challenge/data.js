const users = [
    { id: "1", fullName: "Ramazan Çelik" },
    { id: "2", fullName: "Metin Demir" },
];

const posts = [
    { id: "1", title: "Ramazanın gönderisi", user_id: "1" },
    { id: "2", title: "Metinin gönderisi", user_id: "1" },
    { id: "3", title: "Metinin gönderisi", user_id: "2" },
];

const comments = [
    { id: "1", text: "Lorem Ipsum", post_id: "1", user_id: "1" },
    { id: "2", text: "foo bar", post_id: "1", user_id: "2" },
    { id: "3", text: "foo bar baz", post_id: "2", user_id: "1" },
];

module.exports = {
    users,
    posts,
    comments,
};