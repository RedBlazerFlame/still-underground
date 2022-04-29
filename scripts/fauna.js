import faunadb from "faunadb";
// Setting up Fauna
if (process.env.FAUNA_SECRET_KEY === undefined) {
    throw new Error("No Fauna Key Detected");
}
const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET_KEY,
});
const { Create, Collection, Get, Ref, Match, Index, Call, Function: Fn, Paginate, } = faunadb.query;
export { client };
export { Create, Collection, Get, Ref, Match, Index, Call, Fn, Paginate };
