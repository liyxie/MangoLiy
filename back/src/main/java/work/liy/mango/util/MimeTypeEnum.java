package work.liy.mango.util;

import cn.hutool.core.io.FileTypeUtil;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * @author lisw
 * @program wuming-SpringBoot+Mybatis仿微信聊天小程序
 * @description
 * @createDate 2023-05-05 16:58:03
 **/
@Getter
public enum MimeTypeEnum {

    AAC("acc", "AAC音频", "audio/aac", 1), // 音频
    ABW("abw", "AbiWord文件", "application/x-abiword", 3), // 其他
    ARC("arc", "存档文件", "application/x-freearc", 3), // 其他
    AVI("avi", "音频视频交错格式", "video/x-msvideo", 4), // 视频
    AZW("azw", "亚马逊Kindle电子书格式", "application/vnd.amazon.ebook", 3), // 其他
    BIN("bin", "任何类型的二进制数据", "application/octet-stream", 3), // 其他
    BMP("bmp", "Windows OS / 2位图图形", "image/bmp", 2), // 图片
    BZ("bz", "BZip存档", "application/x-bzip", 3), // 其他
    BZ2("bz2", "BZip2存档", "application/x-bzip2", 3), // 其他
    CSH("csh", "C-Shell脚本", "application/x-csh", 3), // 其他
    CSS("css", "级联样式表（CSS）", "text/css", 3), // 其他
    CSV("csv", "逗号分隔值（CSV）", "text/csv", 3), // 其他
    DOC("doc", "微软Word文件", "application/msword", 3), // 其他
    DOCX("docx", "Microsoft Word（OpenXML）", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 3), // 其他
    EOT("eot", "MS Embedded OpenType字体", "application/vnd.ms-fontobject", 3), // 其他
    EPUB("epub", "电子出版物（EPUB）", "application/epub+zip", 3), // 其他
    GZ("gz", "GZip压缩档案", "application/gzip", 3), // 其他
    /////////////////////////////////////
    GIF("gif", "图形交换格式（GIF）", "image/gif", 2), // 图片
    HTM("htm", "超文本标记语言（HTML）", "text/html", 3), // 其他
    HTML("html", "超文本标记语言（HTML）", "text/html", 3), // 其他
    ICO("ico", "图标格式", "image/vnd.microsoft.icon", 2), // 图片，尽管它通常用作图标，但技术上仍然是图片格式
    ICS("ics", "iCalendar格式", "text/calendar", 3), // 其他
    JAR("jar", "Java存档", "application/java-archive", 3), // 其他
    JPEG("jpeg", "JPEG图像", "image/jpeg", 2), // 图片
    JPG("jpg", "JPEG图像", "image/jpeg", 2), // 图片
    JS("js", "JavaScript", "text/javascript", 3), // 其他
    JSON("json", "JSON格式", "application/json", 3), // 其他
    JSONLD("jsonld", "JSON-LD格式", "application/ld+json", 3), // 其他
    MID("mid", "乐器数字接口（MIDI）", "audio/midi", 1), // 音频
    MIDI("midi", "乐器数字接口（MIDI）", "audio/midi", 1), // 音频
    MJS("mjs", "JavaScript模块", "text/javascript", 3), // 其他
    MP3("mp3", "MP3音频", "audio/mpeg", 1), // 音频
    MP4("mp4", "MP4视频", "audio/mpeg", 4), // 音频
    MPEG("mpeg", "MPEG视频", "video/mpeg", 4), // 视频
    MPKG("mpkg", "苹果安装程序包", "application/vnd.apple.installer+xml", 3), // 其他
    ODP("odp", "OpenDocument演示文稿文档", "application/vnd.oasis.opendocument.presentation", 3), // 其他（尽管是演示文稿，但通常不认为是视频或音频）
    ODS("ods", "OpenDocument电子表格文档", "application/vnd.oasis.opendocument.spreadsheet", 3), // 其他
    ODT("odt", "OpenDocument文字文件", "application/vnd.oasis.opendocument.text", 3), // 其他
    OGA("oga", "OGG音讯", "audio/ogg", 1), // 音频
    OGV("ogv", "OGG视频", "video/ogg", 4), // 视频
    /////////////
    OGX("ogx", "OGG", "application/ogg", 3), // 其他
    OPUS("opus", "OPUS音频", "audio/opus", 1), // 音频
    OTF("otf", "otf字体", "font/otf", 3), // 其他
    PNG("png", "便携式网络图形", "image/png", 2), // 图片
    PDF("pdf", "Adobe 可移植文档格式（PDF）", "application/pdf", 3), // 其他
    PHP("php", "php", "application/x-httpd-php", 3), // 其他
    PPT("ppt", "Microsoft PowerPoint", "application/vnd.ms-powerpoint", 3), // 其他
    PPTX("pptx", "Microsoft PowerPoint（OpenXML）", "application/vnd.openxmlformats-officedocument.presentationml.presentation", 3), // 其他
    RAR("rar", "RAR档案", "application/vnd.rar", 3), // 其他
    RTF("rtf", "富文本格式", "application/rtf", 3), // 其他
    SH("sh", "Bourne Shell脚本", "application/x-sh", 3), // 其他
    SVG("svg", "可缩放矢量图形（SVG）", "image/svg+xml", 2), // 图片
    SWF("swf", "小型Web格式（SWF）或Adobe Flash文档", "application/x-shockwave-flash", 3), // 其他
    TAR("tar", "磁带存档（TAR）", "application/x-tar", 3), // 其他
    TIF("tif", "标记图像文件格式（TIFF）", "image/tiff", 2), // 图片
    TIFF("tiff", "标记图像文件格式（TIFF）", "image/tiff", 2), // 图片
    TS("ts", "MPEG传输流", "video/mp2t", 4), // 视频
    TTF("ttf", "ttf字体", "font/ttf", 3), // 其他
    TXT("txt", "文本（通常为ASCII或ISO 8859-n）", "text/plain", 3), // 其他
    VSD("vsd", "微软Visio", "application/vnd.visio", 3), // 其他
    WAV("wav", "波形音频格式", "audio/wav", 1), // 音频
    WEBA("weba", "WEBM音频", "audio/webm", 1), // 音频
    WEBM("webm", "WEBM视频", "video/webm", 4), // 视频
    WEBP("webp", "WEBP图像", "image/webp", 2), // 图片
    WOFF("woff", "Web开放字体格式（WOFF）", "font/woff", 3), // 其他
    WOFF2("woff2", "Web开放字体格式（WOFF）", "font/woff2", 3), // 其他
    XHTML("xhtml", "XHTML", "application/xhtml+xml", 3), // 其他
    XLS("xls", "微软Excel", "application/vnd.ms-excel", 3), // 其他
    XLSX("xlsx", "微软Excel（OpenXML）", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 3), // 其他
    XML("xml", "XML", "application/xml", 3), // 其他
    //////////
    XUL("xul", "XUL", "application/vnd.mozilla.xul+xml", 3), // 其他
    ZIP("zip", "ZIP", "application/zip", 3), // 其他
    MIME_3GP("3gp", "3GPP audio/video container", "video/3gpp", 4), // 视频
    MIME_3GP_WITHOUT_VIDEO("3gp", "3GPP audio/video container doesn't contain video", "audio/3gpp2", 1), // 音频
    MIME_3G2("3g2", "3GPP2 audio/video container", "video/3gpp2", 4), // 视频
    MIME_3G2_WITHOUT_VIDEO("3g2", "3GPP2 audio/video container doesn't contain video", "audio/3gpp2", 1), // 音频
    MIME_7Z("7z", "7-zip存档", "application/x-7z-compressed", 3); // 其他

    //扩展名
    private final String extension;
    //说明
    private final String explain;
    //contentType/mime类型
    private final String mimeType;
    // 1音乐；2图片；3其他；4视频
    private final Integer code;

    /**
     * @param extension 上传的文件扩展名
     * @param explain   类型说明
     * @param mimeType  Mime对应的类型
     */
    MimeTypeEnum(String extension, String explain, String mimeType, Integer code) {
        this.extension = extension;
        this.explain = explain;
        this.mimeType = mimeType;
        this.code = code;
    }

    /**
     * @description: 根据文件名判断类型
     * @author: liy
     * @param:
     * @return:
     **/
    public static MimeTypeEnum getByUrl(String Url) {
        if (StringUtils.isEmpty(Url)) {
            return null;
        }
        // 根据后缀判断
        String fileType;

        final Pattern pattern = Pattern.compile("\\S*[?]\\S*");
        Matcher matcher = pattern.matcher(Url);

        String[] spUrl = Url.split("/");
        int len = spUrl.length;
        String endUrl = spUrl[len - 1];
        if(matcher.find()) {
            String[] spEndUrl = endUrl.split("\\?");
            fileType = spEndUrl[0].split("\\.")[1];
        }
        fileType = endUrl.split("\\.")[1];

        MimeTypeEnum typeEnum = getByExtension(fileType);
        if(typeEnum != null){
            return typeEnum;
        }

        // 根据文件流判断
        try {
            fileType = FileTypeUtil.getType(new URL(Url).openStream());
            return getByExtension(fileType);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 通过扩展名获取枚举类型
     *
     * @param extension 扩展名
     * @return 枚举类
     */
    public static MimeTypeEnum getByExtension(String extension) {
        if (StringUtils.isEmpty(extension)) {
            return null;
        }
        for (MimeTypeEnum typesEnum : MimeTypeEnum.values()) {
            if (extension.equalsIgnoreCase(typesEnum.getExtension())) {
                return typesEnum;
            }
        }
        return null;
    }

    /**
     * Content-Type常用对照
     * 根据后缀获取Mime
     *
     * @param fileType 扩展名
     * @return mime类型
     */
    public static String getContentType(String fileType) {
        MimeTypeEnum mimeTypeEnum = MimeTypeEnum.getByExtension(fileType);
        if (mimeTypeEnum != null) {
            return mimeTypeEnum.getMimeType();
        }
        return "application/octet-stream";
    }

    /**
     * @description: 对比
     * @author: liy
     * @param:
     * @return:
     **/
    public static Boolean ContentType(MimeTypeEnum Type, Integer type) {
        if (Type == null) {
            return false;
        }
        for (MimeTypeEnum typesEnum : Arrays.stream(MimeTypeEnum.values()).filter(mimeTypeEnum -> mimeTypeEnum.getCode().equals(type)).collect(Collectors.toList())) {
            if (Type.equals(typesEnum)) {
                return true;
            }
        }
        return false;
    }
}
