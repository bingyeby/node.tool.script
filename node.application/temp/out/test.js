module.exports = {
        'GET /v1/getNewUserDiscountTicketDetail' (req, res){
            console.log('/v1/getNewUserDiscountTicketDetail:',req.query)
            let response = {"s":1,"m":"ok","d":{"isNewUser":true,"isPurchased":false,"isExpired":false,"restCount":0,"serverTimeAt":"2019-01-08T16:09:07.000Z","createdAt":null}}
            res.json(response)
        },
        'GET /v1/getUserNotificationNum' (req, res){
            console.log('/v1/getUserNotificationNum:',req.query)
            let response = {"s":1,"m":"ok","d":{"notification_num":0}}
            res.json(response)
        },
        'GET /v1/getUnreadSystemNotificationNum' (req, res){
            console.log('/v1/getUnreadSystemNotificationNum:',req.query)
            let response = {"s":1,"m":"ok","d":{"unread_num":0}}
            res.json(response)
        },
        'GET /v1/haveWalletAccessRight' (req, res){
            console.log('/v1/haveWalletAccessRight:',req.query)
            let response = {"s":5,"m":"access denied","d":[]}
            res.json(response)
        },
        'GET /v1/tag/type/new/search/jekens/page/1/pageSize/10' (req, res){
            console.log('/v1/tag/type/new/search/jekens/page/1/pageSize/10:',req.query)
            let response = {"s":1,"m":"success","d":{"tags":[],"total":0}}
            res.json(response)
        },
        'GET /v1/get_entry_by_ids' (req, res){
            console.log('/v1/get_entry_by_ids:',req.query)
            let response = {"s":1,"m":"ok","d":{"total":1,"entrylist":[{"collectionCount":16,"autoPass":false,"commentsCount":0,"gfw":false,"buildTime":1546829915.964,"checkStatus":true,"objectId":"5bf35dff51882527796aa430","entryView":"","subscribersCount":0,"ngxCachedTime":1546934948,"verifyStatus":true,"tags":[{"ngxCachedTime":1546934844,"ngxCached":true,"title":"微服务","id":"56de5591da2f600055af7d96"},{"ngxCachedTime":1546934869,"ngxCached":true,"title":"Docker","id":"55644032e4b03286789d7528"},{"ngxCachedTime":1546934879,"ngxCached":true,"title":"容器","id":"5b34b5ce518825766cb12ca5"},{"ngxCachedTime":1546934914,"ngxCached":true,"title":"运维","id":"5602d88360b27db45a7f3bdc"}],"isEvent":false,"rankIndex":0.0016206539019867,"hot":false,"updatedAt":"2019-01-07T02:58:35.963Z","originalUrl":"https://juejin.im/post/5bf35cbe6fb9a049bd41e6f0","verifyCreatedAt":"2018-11-20T03:08:57.173Z","createdAt":"2018-11-20T03:08:57.173Z","user":{"community":{"wechat":{"avatarLarge":"http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erPuFLRjCicvRdh2keUNXWOotqCuKP54bysyRl5rxmM0BK1iaenrdibUviaU7YP84LI7y4HnS1VwiccShQ/132"},"github":{"username":"limingios","avatarLarge":"https://avatars1.githubusercontent.com/u/13448645?v=4","uid":"13448645"}},"collectedEntriesCount":57,"company":"亚信科技","followersCount":2135,"followeesCount":0,"role":"guest","postedPostsCount":101,"isAuthor":false,"postedEntriesCount":0,"totalCommentsCount":5,"ngxCachedTime":1546934911,"ngxCached":true,"viewedEntriesCount":37,"jobTitle":"架构师","subscribedTagsCount":1,"totalCollectionsCount":207,"username":"IT人故事会","avatarLarge":"http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erPuFLRjCicvRdh2keUNXWOotqCuKP54bysyRl5rxmM0BK1iaenrdibUviaU7YP84LI7y4HnS1VwiccShQ/132","objectId":"5b50a0b9e51d45198565aae3"},"author":"","screenshot":"","original":true,"hotIndex":526.8959,"content":"1.传统服务和微服务对比的方式来进行学习。 很多老铁都是搞java的，了解下springboot 和 cloud跟微服务，跟docker的关系，跟服务编排框架的关系。 几个微服务，微服务需要怎么来划分。 他们之前的关系，他们是如何划分的。 服务docker化，调整配置，制作成d…","title":"『高级篇』docker容器来说微服务导学（一）","lastCommentTime":"1970-01-01T00:00:00.Z","type":"post","english":false,"category":{"ngxCached":false,"title":"devops","id":"5b34a478e1382338991dd3c1","name":"运维","ngxCachedTime":1546934948},"viewsCount":364,"summaryInfo":"","isCollected":false}]}}
            res.json(response)
        },
        'GET /v1/isInMyCollectionSet' (req, res){
            console.log('/v1/isInMyCollectionSet:',req.query)
            let response = {"d":[{"entryId":"5bf35dff51882527796aa430","isIn":false}],"m":"success","s":1}
            res.json(response)
        },
}