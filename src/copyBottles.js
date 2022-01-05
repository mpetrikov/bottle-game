export const copyBottles = (bottles) => {
    return bottles.map((bottle) => ({ colors: [...bottle.colors], id: bottle.id }));
};
