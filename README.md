# TypeScript-GraphQL-Practice
TypeScriptとGraphQLの練習のため、Ben AwadさんのTypeGraphQL https://www.youtube.com/playlist?list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs
に沿って作成した物になります。  
GraphQLでCRUDとRedisを使ったログイン、ログアウト、Cookie認証機能が出来ます。

## クローンする際の注意点
DBは環境変数で保護してますので、ご自身でDBを用意し設定してください。
package.jsonをyarn installし、yarn startでapollo-serverを起動し、別でRedis-serverを起動させてください。
