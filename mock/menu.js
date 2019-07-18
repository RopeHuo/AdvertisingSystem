
export default [
  // user login
  {
    url: '/api/v2/campaigns/tree',
    type: 'post',
    response: config => {
      const { username } = config.body

      return {
        code: 20000,
        data: [
          {
             campaignId: "2029615360",
             campaignName: "test-zsxl-022",
            status: "ENABLED",
            servingStatus: "PENDING",
            advertisingChannelType: "DISPLAY",
            adGroups: [
              {
                adGroupName:'654645645'
              },
              {
                adGroupName:'765756756'
              }
            ]
          },
          {
            campaignId: "2029615361",
            campaignName: "test-zsxl-021",
            status: "ENABLED",
            servingStatus: "PENDING",
            advertisingChannelType: "DISPLAY",
            adGroups: [
              {
                adGroupName:'1212'
              },
              {
                adGroupName:'32423423'
              }
            ]
          }
        ]
      }
    }
  }
]
