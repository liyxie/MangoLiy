

package work.liy.mango.Interceptor;

/**
 * @Author LiY
 */
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import work.liy.mango.service.MangoUserService;


public class TokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // 从请求中获取 token
        String token = request.getHeader("Authorization");
        MangoUserService userService;

        // 根据业务逻辑验证 token 的有效性，这里只是简单判断 token 是否为空
        if (token == null || token.isEmpty()) {
            // 如果 token 为空，返回未授权的错误码
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        userService = new MangoUserService();
        if(userService.selectUserByOpenid(token) == null){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        // 如果 token 有效，放行请求
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        // 在请求处理之后进行调用，但是在视图被渲染之前（Controller 方法调用之后）
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        // 在整个请求结束之后被调用，也就是在 DispatcherServlet 渲染了对应的视图之后执行（主要用于进行资源清理工作）
    }
}
