import {
  simulation,
  scenario,
  exec,
  pause,
  rampUsersPerSec,
  constantUsersPerSec,
  stressPeakUsers,
  global,
  RawFileBody
} from "@gatling.io/core";
import {http} from "@gatling.io/http";

export default simulation((setUp) => {

  const httpProtocol = http
    .baseUrl("https://opensource-demo.orangehrmlive.com")
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0"
    );

  const scn = scenario("KataDaviviendaPerfomrance").exec(
    http("GET Home").get("/web/index.php/auth/login"),
    pause(180),
    http("GET Page 2").get("/web/index.php/pim/saveEmployee")
  );

  setUp(
    scn.injectOpen(rampUsersPerSec(5).to(50).during(300))
  ).protocols(httpProtocol);
});